"use strict";
let _player = {
    username: null,
    token: null,
    gameId: null
};
document.addEventListener('DOMContentLoaded',init);

function init(){
    processProperty("Connecticut");
    if (document.querySelector('#connect-game')){
        initConnect();
    }
    else if (document.querySelector('#index')){
        initIndex();
    }
    else if (document.querySelector('#waiting-form')){
        initMainBoard();
    }
}

function initConnect(){
    document.querySelector('#connect-form select').addEventListener('change', processAvailableGames);
    document.querySelector("#connect-form").addEventListener("submit", processConnectionForm);
}
function initIndex(){
    document.querySelector("#start-game").addEventListener('click',() => location.href = "better-luck-next-time.html");
}
function initMainBoard(){
    _player = loadFromStorage("_player");
    getGameInformationByGameID(showJoinedPlayers);
    getGameInformationByGameID(checkIfGameHasStarted);
    document.querySelector('#offerPlaceholder button[type=submit]').addEventListener('click', bid);
}
