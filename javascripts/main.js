
const printToDom = (divId, string) => {
    document.getElementById(divId).innerHTML = string;
};

const buildDomString = (data1, data2) => {
    let domString = '';
    domString += `<div class="player-info">`;
    domString +=    `<img src="${data1.gravatar_url}">`;
    domString +=    `<h3>${data1.name}</h3>`;
    domString +=    `<h4>${data1.points.total}</h4>`;
    domString += `</div>`;
    domString += `<div class="player-info">`;
    domString +=    `<img src="${data2.gravatar_url}">`;
    domString +=    `<h3>${data2.name}</h3>`;
    domString +=    `<h4>${data2.points.total}</h4>`;
    domString += `</div>`;
    printToDom("players", domString);
};

const winner = (p1data, p2data) => {
    let domString = '';
    if(p1data.points.total > p2data.points.total){
        domString += `<div>${p1data.name}</div>`;
    } else {
        domString += `<div>${p2data.name}</div>`;
    }
    printToDom("winner", domString);
};

function loadForSinglePoints() {
    const player1 = document.getElementById("player1-input").value;
    const player2 = document.getElementById("player2-input").value;
    const data1 = JSON.parse(this.responseText);
    getSecondPlayer(data1, player2);
}

const getSecondPlayer = (data1, player) => {
    let myRequest = new XMLHttpRequest();
    myRequest.addEventListener('load', jsonConvert);
    myRequest.addEventListener('error', xhrError);
    myRequest.open('GET', `https://teamtreehouse.com/${player}.json`);
    myRequest.send();

    function jsonConvert(){
        const data2 = JSON.parse(this.responseText);
        buildDomString(data1, data2);
        winner(data1, data2);
    }
};

const eventListener = () => {
    const button = document.getElementById("button");
    button.addEventListener('click', () => {
        const player1 = document.getElementById("player1-input").value;
        const player2 = document.getElementById("player2-input").value;
        genericXhrRequest(player1, loadForSinglePoints);
    });
};

function xhrError() {
    alert('Sorry, something went wrong. Please contact the coder and tell him to get his act together');
}

const genericXhrRequest = (player, callback) => {
    let myRequest = new XMLHttpRequest();
    myRequest.addEventListener('load', callback);
    myRequest.addEventListener('error', xhrError);
    myRequest.open('GET', `https://teamtreehouse.com/${player}.json`);
    myRequest.send();
};

const startApplication = () => {
    eventListener();
};

startApplication();