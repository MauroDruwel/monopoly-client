"use strict";

async function startGame(){
    await retrieveTiles(); // fetch board tiles
    await retrieveGame(); // fetch game data
}

async function reloadGame() {
    // fetch game data here:
    await retrieveGame();

    // check game status here:
    checkBankrupt();

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
