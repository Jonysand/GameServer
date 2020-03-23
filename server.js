const fs = require('fs');
const express = require(`express`);
const Datastore = require("nedb");
const app = express();
const mysql = require("mysql");
require('dotenv').config();

let mysqlConnectionPool = mysql.createConnection({
    connectionLimit : 10,
    host     : process.env.host,
    user     : process.env.MysqlUser,
    password : process.env.MysqlPassword,
    database : process.env.MysqlDatabase
})

app.use(express.static('public'));
app.use(express.json());

app.listen(8883, function (){
    console.log("Server on port 8883");
})

const content = fs.readFileSync('testData.json');
let testData = JSON.parse(content);

// ENDPOINT
app.get("/data", (request, response) => {
    response.json(testData);
});

//----------
// chat room
//----------
const ChatHistoryDB = new Datastore({filename:"chathistory.db", autoload:true});
app.get("/ChatHistoryData", (request, response) => {
    let sqlQuery = "SELECT * FROM ChatHistory ORDER BY SenderTimestamp DESC;"
    mysqlConnectionPool.query(
        sqlQuery,
        function (error, results, fields) {
            if (error){
                console.log(error);
            }else{
                response.json(results);
            }
        }
    );
})
app.post("/ChatMessageSent", (request, response) => {
    let sqlQuery = "INSERT INTO ChatHistory(id, SenderName, SenderMessage, SenderTimestamp) VALUES (UUID_TO_BIN(UUID()), ?, ?, ?)"
    let values = [request.body.name, request.body.message, (new Date()).toISOString().slice(0, 19).replace('T', ' ')]
    mysqlConnectionPool.query(
        sqlQuery,
        values,
        function (error, results, fields) {
            if (error){
                console.log(error);
                response.json({"result":"fail_updating"});
            }else{
                response.json({"result":"success_updating"});
            }
        }
    );
})


//-----------------
// game data saving
//-----------------
// Unity Drop Game
const UnityDropGameDB = new Datastore({filename:"UnityDropGame.db", autoload:true});
app.get("/UnityDropGameData", (request, response) => {
    UnityDropGameDB.find({}).sort({score:-1}).limit(10).exec((err, docs)=>{
        if(err){
            response.json({"result":"fail_fetching"});
            console.log("fail_fetching");
        }
        else{
            response.json(docs);
        }
    })
})
app.post("/UnityDropGameDataUpdate", (request, response) => {
    console.log(request.body);
    let newMessage = {
        "name": `${request.body.playerName}`,
        "score": parseInt(request.body.score),
        "timestamp":`${Date().toString()}`
    };
    UnityDropGameDB.insert(newMessage,(err, docs)=>{
        if(err){
            response.json({"result":"fail_updating"});
            console.log("fail_updating");
        }
        else{
            response.json({"result":"success_updating"});
            console.log("success_updating");
        }
    })
})
