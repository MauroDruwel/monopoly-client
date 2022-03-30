"use strict";
let _player = {
    username: null,
    token: null,
    gameId: null
};
document.addEventListener('DOMContentLoaded',init);

function init(){
    if (document.querySelector('#connect-game')){
        initConnect();
    }
    else if (document.querySelector('#index')){
        initIndex();
    }
    else if (document.querySelector('#waiting-form')){
        initWaitingForm();
    }
}

function initConnect(){
    document.querySelector('#connect-form select').addEventListener('change', processAvailableGames);
    document.querySelector("#connect-form").addEventListener("submit", processConnectionForm);
}
function initIndex(){
    document.querySelector("#start-game").addEventListener('click',() => location.href = "connect-game.html");
}
function initWaitingForm(){
    _player = loadFromStorage("_player");
    getGameInformationByGameID(showJoinedPlayers);
    getGameInformationByGameID(checkIfGameHasStarted);
}
