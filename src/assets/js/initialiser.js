"use strict";
let _player = {
    username: null,
    token: null,
    gameId: null,
    pawn: null
};
document.addEventListener('DOMContentLoaded',init);

function init(){
    if (document.querySelector('#connect-game')){
        initConnect();
    }
    else if (document.querySelector('#index')){
        initIndex();
    }
    else if (document.querySelector('#queue')){
        initQueue();
    }
    else if (document.querySelector('#main-board')){
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

function initQueue(){
    _player = loadFromStorage("_player");
    gameState(renderQueue);

}

function initMainBoard(){
    _player = loadFromStorage("_player");

    // auction
    document.querySelector('#offer-placeholder button[type=submit]').addEventListener('click', bid);
}
