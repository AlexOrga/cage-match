const printToDom = (divId, string) => {
    document.getElementById(divId).innerHTML = string;
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