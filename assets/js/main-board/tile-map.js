"use strict";

function processTileMap(section, username){
    renderTileMap(section, retrievePlayer(username));
}

function processTileMapNavigation(e){
    e.preventDefault();
    const $tile = e.target.closest('.tile-map div[data-tile]');
    if(!$tile){
        return;
    }
    _player.carousel = parseInt($tile.dataset.position);
    renderCarousel();
}
