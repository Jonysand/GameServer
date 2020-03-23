let HeroName;
let ChatHistory;

window.addEventListener('load', init)

function init(){
    buildHeroSelectControl(owData.HeroList);
    HeroName = owData.HeroList[0];
    document.getElementById("SendButton").addEventListener("click", sendMessage);
    loadHistory();
    // resize the main area
    if (window.innerWidth*4 > window.innerHeight*3) { // Desktop
        document.getElementById("MainArea").style.width = "600px";
        document.getElementById("MainArea").style.margin = "0 auto";
    }
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
    alert("Message Sent!");
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
        eachMessageProfile.appendChild(document.createTextNode(`· ${eachMessage.SenderName}`));

        let eachMessageMes = document.createElement("p");
        eachMessageMes.setAttribute('class', 'DialogBoxMessage');
        eachMessageMes.appendChild(document.createTextNode(`${eachMessage.SenderMessage}`));

        let eachMessageMain = document.createElement("div");
        eachMessageMain.setAttribute('class', 'DialogBoxEachMain');
        eachMessageMain.appendChild(eachMessageProfile);
        eachMessageMain.appendChild(eachMessageMes);

        let eachMessageTime = document.createElement("p");
        eachMessageTime.setAttribute('class', 'DialogBoxTimestamp');
        eachMessageTime.appendChild(document.createTextNode(`${timeFormat(new Date(eachMessage.SenderTimestamp))}`));

        eachMessageHTML.appendChild(eachMessageMain);
        eachMessageHTML.appendChild(eachMessageTime);
        dialogBox.appendChild(eachMessageHTML);
    });
}

const monthEng = [  "Jan", 
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec"
];

function timeFormat(time){
    let result = "";
    if((new Date()).getFullYear-time.getFullYear() > 0){
        result += time.getFullYear();
        result += ' ';
    }
    result += monthEng[time.getMonth()];
    result += '.';
    result += ("0" + time.getDate()).slice(-2);
    result += ' ';
    result += ("0" + time.getHours()).slice(-2);
    result += ':';
    result += ("0" + time.getMinutes()).slice(-2);
    return result;
}
