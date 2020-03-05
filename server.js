const fs = require('fs');
const path = require(`path`);
const express = require(`express`);
const Datastore = require("nedb");
const app = express();

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
    ChatHistoryDB.find({}).sort({timestamp:-1}).exec((err, docs)=>{
        if(err){
            response.json({"result":"fail_fetching"});
            console.log("fail_fetching");
        }
        else{
            response.json(docs);
        }
    })
})
app.post("/ChatMessageSent", (request, response) => {
    let newMessage = {
            "name": `${request.body.name}`,
            "message": `${request.body.message}`,
            "timestamp":`${Date().toString()}`
        };
        ChatHistoryDB.insert(newMessage,(err, docs)=>{
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
