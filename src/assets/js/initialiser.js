"use strict";
let _token = {token: null};
let _gameID = null;

document.addEventListener('DOMContentLoaded',init);

function init(){
    if (document.querySelector('#join-create')){
        initJoinCreate();
    }
    else if (document.querySelector('#index')){
        initIndex();
    }
    else if (document.querySelector('#waiting-form')){
        initWaitingForm();
    }
}

function initJoinCreate(){
    fetchGames(showGames);
    document.querySelector("#join-game button[type=submit]").addEventListener("click",joinAGame);
    document.querySelector("#create-game button[type=submit]").addEventListener('click',createGame);
}
function initIndex(){
    document.querySelector("#start-game").addEventListener('click',goToJoinCreate);
}
function initWaitingForm(){
    getGameInformationByGameID(showJoinedPlayers);
}
