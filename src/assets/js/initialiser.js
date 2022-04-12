"use strict";
let _player = {
    username: null,
    token: null,
    gameId: null,
    pawn: null,
    carousel: 0
};

let _players = {}; // don't change to const
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
        startGame().then(() => {
            initMainBoard();
            reloadGame().catch(errorHandler);
        }).catch(errorHandler);
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
    // tile map template
    addEventListenerToElements('click', processTileMapNavigation, '.tile-map');

    // auction
    document.querySelector('#offer-placeholder button[type="button"]').addEventListener('click', bid);

    // carousel
    renderCarousel();
    document.querySelector('#carousel-navigation').addEventListener('click', navigateCarousel);
}
