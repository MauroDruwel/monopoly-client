"use strict";

function processTileMap(username){
    for(let i = 0; i < _players.length; i++){
        if(_player[i].name === username){
            renderTileMap(_player[i]);
        }
    }
}

function processTileMapNavigation(e){
    e.preventDefault();
    const $tile = e.target.closest('.tile-map div[data-tile]');
    if(!$tile){
        return;
    }
    // do something here
}
