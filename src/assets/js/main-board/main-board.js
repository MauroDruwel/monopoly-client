"use strict";

function processTiles() {
    fetchFromServer(`/tiles`, "GET").then(tiles => {
        tiles.forEach(tile => {
            _tiles[tile.nameAsPathParameter] ={};
            for(const key in tile){
                _tiles[tile.nameAsPathParameter][key] = tile[key];
            }
        });
    }).then(() => {
        saveToStorage("_tiles", _tiles);
    }).catch(errorHandler);
}

function processPlayers(){
    fetchFromServer(`/games/dummy`, "GET").then(game => {
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
