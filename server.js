const fs = require('fs');
const path = require(`path`);
const express = require(`express`);
const app = express()

app.use(express.static('public'));
app.use(express.json());

app.listen(8883, function (){
    console.log("Server on port 8883");
})

const content = fs.readFileSync('testData.json');
let testData = JSON.parse(content);

const ExampleChatHistoryData = JSON.parse(fs.readFileSync('./public/chatroom/exampleChatData.json'));

// ENDPOINT
app.get("/data", (request, response) => {
    response.json(testData);
});

app.get("/ChatHistoryData", (request, response) => {
    response.json(JSON.parse(fs.readFileSync('./public/chatroom/ChatData.json')));
})

app.post("/ChatMessageSent", (request, response) => {
    let newMessage = {
            "name": `${request.body.name}`,
            "message": `${request.body.message}`,
            "timestamp":`${Date().toString()}`
            // Date().toString()
            // Date(Date().toString())
        };
    let ChatHistory = JSON.parse(fs.readFileSync('./public/chatroom/ChatData.json'));
    ChatHistory.push(newMessage);
    fs.writeFileSync('./public/chatroom/ChatData.json', JSON.stringify(ChatHistory));
    response.json({"result":"success"});
})