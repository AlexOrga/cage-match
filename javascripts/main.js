const printToDom = (divId, string) => {
    document.getElementById(divId).innerHTML = string;
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

const eventListener = () => {
    
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
