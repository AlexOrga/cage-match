// let scores = [];
// let keys;

// const printToDom = (divId, string) => {
//     document.getElementById(divId).innerHTML += string;
// };

// const buildDomString = (playerinfo) => {
//     let domString = '';
//     domString += `<div class="player-info">`;
//     domString +=    `<img src="${playerinfo.gravatar_url}">`;
//     domString +=    `<h3>${playerinfo.name}</h3>`;
//     domString +=    `<h4>${playerinfo.points.total}</h4>`;
//     domString += `</div>`;
//     printToDom("players", domString);
// };

// const compareScores = () => {
//     if(!scores.length){
//         console.log('no scores yet');
//     }else if(scores[0].score > scores[1].score){
//         console.log(scores);
//         console.log(scores[0].name);
//     } else {
//         console.log(scores);
//         console.log(scores[1].name);
//     }
// };


// const eventListener = () => {
//     const button = document.getElementById("button");
//     button.addEventListener('click', () => {
//         const player1 = document.getElementById("player1-input").value;
//         const player2 = document.getElementById("player2-input").value;
//         genericXhrRequest(player1, successFunction);
//         genericXhrRequest(player2, successFunction);
//         setTimeout(compareScores, 3000);
//     });
// };

// function successFunction() {
//     const data = JSON.parse(this.responseText);
//     scores.push({name: data.name, score: data.points.total})
//     buildDomString(data);
// }

// function xhrError() {
//     alert('Sorry, something went wrong. Please contact the coder and tell him to get his act together');
// }

// const genericXhrRequest = (player, callback) => {
//     let myRequest = new XMLHttpRequest();
//     myRequest.addEventListener('load', callback);
//     myRequest.addEventListener('error', xhrError);
//     myRequest.open('GET', `https://teamtreehouse.com/${player}.json`);
//     myRequest.send();
// };

// const startApplication = () => {
//     eventListener();
// };

// startApplication();

const printToDom = (divId, string) => {
    document.getElementById(divId).innerHTML += string;
};

const buildDomString = (playerinfo) => {
    let domString = '';
    domString += `<div class="player-info">`;
    domString +=    `<img src="${playerinfo.gravatar_url}">`;
    domString +=    `<h3>${playerinfo.name}</h3>`;
    domString +=    `<h4>${playerinfo.points.total}</h4>`;
    domString += `</div>`;
    printToDom("players", domString);
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
        winner(data1, data2)
    }
};

const eventListener = () => {
    const button = document.getElementById("button");
    button.addEventListener('click', () => {
        const player1 = document.getElementById("player1-input").value;
        const player2 = document.getElementById("player2-input").value;
        genericXhrRequest(player1, successFunction);
        genericXhrRequest(player2, successFunction);
        genericXhrRequest(player1, loadForSinglePoints);
    });
};


function successFunction() {
    const data = JSON.parse(this.responseText);
    buildDomString(data);
}

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