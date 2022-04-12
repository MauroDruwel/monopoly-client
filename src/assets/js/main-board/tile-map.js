"use strict";

function processTileMap(username){
    renderTileMap(_players[username]);
}

function processTileMapNavigation(e){
    e.preventDefault();
    const $tile = e.target.closest('.tile-map div[data-tile]');
    if(!$tile){
        return;
    }
    // do something here
}
