// individual items in this database is called "document"

const Datastore = require("nedb");
const mysql = require("mysql");
require('dotenv').config();

let mysqlConnection = mysql.createConnection({
    host     : process.env.host,
    user     : process.env.MysqlUser,
    password : process.env.MysqlPassword,
    database : process.env.MysqlDatabase
})

mysqlConnection.connect();

const db = new Datastore({filename:"chathistory.db", autoload:true});
db.loadDatabase();

db.find({}, (err, docs)=>{
    docs.forEach(doc => {
        let sqlQuery = "INSERT INTO ChatHistory(id, SenderName, SenderMessage, SenderTimestamp) VALUES (?, ?, ?, ?)"
        let values = [doc._id, doc.name, doc.message, (new Date(doc.timestamp)).toISOString().slice(0, 19).replace('T', ' ')]
        mysqlConnection.query(
            sqlQuery,
            values,
            function (error, results, fields) {
                if (error){
                    console.log(error);
                }
            }
        );
    });
})


// mysqlConnection.end();

// ------------------NeDB Syntax--------------------

// db.insert(oneMes, (err, docs) => {
//     if(err) {console.log(err);}
//     console.log(docs);
// });

// db.find({name:"Genji"}, (err, doc)=>{
//     console.log(doc);
// })

// db.remove({name:"Genji"}, (err, doc)=>{
//     console.log(doc);
// })

// replace the whole item with the new one
// db.update({name:"Genji"}, {name:"Mercy"}, {returnUpdatedDocs: true}, (err, num, updatedDoc) =>{
//     console.log(updatedDoc);
// })

// only update parts of value
// db.update({name:"Genji"}, {$set: {name:"Mercy"}}, {returnUpdatedDocs: true}, (err, num, updatedDoc) =>{
//     console.log(updatedDoc);
// })

// sorting: 1 for ascending, -1 for descending
// db.find({}).sort({name: 1}).exec((err, docs)=>{
//     console.log(docs);
// })