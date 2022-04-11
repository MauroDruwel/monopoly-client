"use strict";
let _player = {
    username: null,
    token: null,
    gameId: null,
    pawn: null,
    carousel: 0
};

let _players = {};
let _tiles = [];

document.addEventListener('DOMContentLoaded',init);

function init(){
    _players = loadFromStorage("_players"); // DEV MODE _ DELETE LATER
    _tiles = loadFromStorage("_tiles"); // DEV MODE _ DELETE LATER

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

async function initMainBoard() {
    _player = loadFromStorage("_player");

    await processTiles();
    await processPlayers();
    console.log(_players);
    console.log(_tiles);

    // tile map template
    addEventListenerToElements('click', processTileMapNavigation, '.tile-map');

    // auction
    document.querySelector('#offer-placeholder button[type="button"]').addEventListener('click', bid);

    // carousel
    document.querySelector('#carousel-navigation').addEventListener('click', navigateCarousel);
}
