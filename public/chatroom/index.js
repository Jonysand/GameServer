let HeroName;
let ChatHistory;

window.addEventListener('load', init)

function init(){
    buildHeroSelectControl(owData.HeroList);
    HeroName = owData.HeroList[0];
    document.getElementById("SendButton").addEventListener("click", sendMessage);
    loadHistory();
}

function buildHeroSelectControl(list){
    const select = document.getElementById('CharactorSelect');
    list.forEach(item => {
        const option = document.createElement('option');
        option.innerText = item;
        select.appendChild(option);
    });
    select.addEventListener('change', onHeroSelected, false);
}

function onHeroSelected(e){
    HeroName = e.target.value;
}

async function sendMessage(){
    let textToSend = document.getElementById("InputMessage");
    if(textToSend.value=="") return;
    // Write Data
    const response = await fetch('http://www.jonysandyk.com:8883/ChatMessageSent', {
            method: 'POST',
            headers:{
                "Content-Type":  "application/json"
            },
            body: JSON.stringify({
                "name": `${HeroName}`,
                "message":`${textToSend.value}`,
            })
        })
    const resultJson = await response.json();
    console.log(resultJson.result);
    setTimeout(function() {
        location.reload();
      }, 1000);
}

async function loadHistory(){
    // fetch data
    const response = await fetch('http://www.jonysandyk.com:8883/ChatHistoryData', {
            method: 'GET', 
            headers:{
                "Content-Type":  "application/json"
            }
        })
    const ChatHistory = await response.json();
    
    // build dialog box
    const dialogBox = document.getElementById('DialogBox')
    ChatHistory.forEach(eachMessage => {
        let eachMessageHTML = document.createElement("div");
        eachMessageHTML.setAttribute('class', 'DialogBoxOnemes');
        let eachMessageProfile = document.createElement("p");
        eachMessageProfile.setAttribute('class', 'DialogBoxProfile');
        eachMessageProfile.appendChild(document.createTextNode(`${eachMessage.name}`));
        let eachMessageMes = document.createElement("p");
        eachMessageMes.setAttribute('class', 'DialogBoxMessage');
        eachMessageMes.appendChild(document.createTextNode(`${eachMessage.message}`));
        let eachMessageTime = document.createElement("p");
        eachMessageTime.setAttribute('class', 'DialogBoxTimestamp');
        eachMessageTime.appendChild(document.createTextNode(`${new Date(eachMessage.timestamp)}`));

        eachMessageHTML.appendChild(eachMessageProfile);
        eachMessageHTML.appendChild(eachMessageMes);
        eachMessageHTML.appendChild(eachMessageTime);
        dialogBox.appendChild(eachMessageHTML);
    });
}
