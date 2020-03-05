// individual items in this database is called "document"

const Datastore = require("nedb");
const fs = require("fs");

const db = new Datastore({filename:"chathistory.db", autoload:true});
db.loadDatabase();

chatData = JSON.parse(fs.readFileSync('./public/chatroom/ChatData.json'));
for (let i = 0; i < chatData.length; i++) {
    const oneMes = {
        "name": chatData[i].name,
        "message": chatData[i].message,
        "timestamp": new Date(chatData[i].timestamp)
    }
    db.insert(oneMes, (err, docs)=>{
        if(err) {console.log(err);}
        console.log(docs);
    })
}

// db.remove({_id:"qMKHXLDJSxtyZSaO"}, (err, docs)=>{
//     console.log(docs);
// })


// ------------------Syntax--------------------

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