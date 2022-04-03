"use strict";
let _player = {
    username: null,
    token: null,
    gameId: null,
    pawn: null
};
document.addEventListener('DOMContentLoaded',init);

function init(){
    document.querySelector('#party_button').addEventListener('click', changeBackground);
    if (document.querySelector('#index')){
        initIndex();
    }
    else if (document.querySelector('#connect-game')){
        initConnect();
    }
    else if (document.querySelector('#queue')){
        initQueue();
    }
    else if(document.querySelector('#select-pawn')){
        initSelectPawn();
    }
    else if (document.querySelector('#main-board')){
        initMainBoard();
    }
}

function initIndex(){
    document.querySelector("#start-game").addEventListener('click',() => location.href = "connect-game.html");
}

function initConnect(){
    document.querySelector('#connect-form select').addEventListener('change', processAvailableGames);
    document.querySelector("#connect-form").addEventListener("submit", processConnectionForm);
}

function initQueue(){
    _player = loadFromStorage("_player");

    // queue
    processQueueState();
}

function initSelectPawn(){
    _player = loadFromStorage("_player");

    // select pawn
    document.querySelector("#select-pawn").addEventListener('click', processSelectedPawn);
}

function initMainBoard(){
    _player = loadFromStorage("_player");

    // tile map template
    addEventListenerToElements('click', processTileMapNavigation, '.tile-map');

    // auction
    document.querySelector('#offer-placeholder button[type="button"]').addEventListener('click', bid);
}
