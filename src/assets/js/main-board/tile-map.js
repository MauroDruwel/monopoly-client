"use strict";

function processTileMap(username){
    for(const player of _players){
        if(player.name === username){
            renderTileMap(player);
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
