"use strict";
const _player = {
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
}

function initConnect(){
    document.querySelector('#connect-form select').addEventListener('change', processAvailableGames);
    document.querySelector("#connect-form").addEventListener("submit", processConnectionForm);
}
function initIndex(){
    document.querySelector("#start-game").addEventListener('click',() => location.href = "connect-game.html");
}
