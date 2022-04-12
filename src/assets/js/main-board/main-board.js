"use strict";

async function startGame(){
    await retrieveTiles(); // fetch board tiles
    await retrieveGame(); // fetch game data
}

async function reloadGame() {
    // fetch game data here:
    await retrieveGame();

    // check game status here:
    checkGameState();

    // this does not reinitialize initMainBoard!
    setTimeout(reloadGame, 1000);
}

function retrieveTiles() {
    return fetchFromServer(`/tiles`, "GET").then(tiles => {
        _tiles = []; // empty array
        tiles.forEach(tile => {
            _tiles.push(tile);
        });
    }).then(() => {
        saveToStorage("_tiles", _tiles);
    }).catch(errorHandler);
}

function retrieveGame(){
    return fetchFromServer(`/games/${_player.gameId}`, "GET").then(game => {
        _game = {}; // empty object
        for (const key in game){
            _game[key] = game[key];
        }
    }).then(() => {
        saveToStorage("_game", _game);
    }).catch(errorHandler);
}

function checkGameState() {
    if (retrievePlayer(_player.username).bankrupt){
        location.href = "loss-screen.html";
    }
    else if (_game.winner === _player.username) {
        location.href = "winner-screen.html";
    }
}

/* player events */

function bankrupt() {
    fetchFromServer(`/games/${_player.gameId}/players/${_player.username}/bankruptcy`, "POST").catch(errorHandler);
}
