"use strict";

async function startGame(){
    await retrieveTiles(); // fetch board tiles
    await retrievePlayers(); // fetch game data
}

async function reloadGame() {
    // fetch game data here:
    await retrievePlayers();

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

function retrievePlayers(){
    return fetchFromServer(`/games/${_player.gameId}`, "GET").then(game => {
        _players = {}; // empty object
        game["players"].forEach(player => {
            _players[player.name] = {};
            for(const key in player){
                _players[player.name][key] = player[key];
            }
        });
    }).then(() => {
        saveToStorage("_players", _players);
    }).catch(errorHandler);
}
