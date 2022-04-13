"use strict";
let _player = {
    username: null,
    token: null,
    gameId: null,
    pawn: null,
    carousel: 0
};

let _game = {}; // don't change to const
let _tiles = []; // don't change to const

document.addEventListener('DOMContentLoaded', init);

function init() {
    if(loadFromStorage("_player")){
        _player = loadFromStorage("_player");
    }

    if (document.querySelector('#index')){
        initIndex();
    }
    else if (document.querySelector('#connect-game')) {
        initConnect();
    }
    else if (document.querySelector('#queue')) {
        initQueue();
    }
    else if (document.querySelector('#select-pawn')) {
        initSelectPawn();
    }
    else if (document.querySelector('#main-board')) {
        initMainBoard();
        startGame().then(() => {
            reloadGame().catch(errorHandler);
        }).catch(errorHandler);
    }
    else if (document.querySelector("#losing-screen")){
        initLosingScreen();
    }
}

function initIndex() {
    document.querySelector("#start-game").addEventListener('click', () => location.href = "connect-game.html");
}

function initConnect() {
    document.querySelector('#connect-form select').addEventListener('change', processAvailableGames);
    document.querySelector("#connect-form").addEventListener("submit", processConnectionForm);
}

function initQueue() {
    processQueueState();
}

function initSelectPawn() {
    document.querySelector("#select-pawn").addEventListener('click', processSelectedPawn);
}

function initMainBoard() {

    /* add event listeners here: */
    addEventListenerToElements('click', processTileMapNavigation, '.tile-map'); // tile map template
    document.querySelector('#offer-placeholder button[type="button"]').addEventListener('click', bid); // auction.js
    document.querySelector('#carousel-navigation').addEventListener('click', navigateCarousel); // carousel.js
    document.querySelector('#role-dice').addEventListener('click', processRoleDice); // main-board.js

}

function initLosingScreen(){
    document.querySelector("#lost-button").addEventListener('click',() => location.href = "connect-game.html");
}
