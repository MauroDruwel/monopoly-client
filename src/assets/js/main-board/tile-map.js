"use strict";

function processTileMap(username){
    fetchFromServer(`/games/${_player.gameId}`, 'GET').then(gameState => {
        const players = gameState.players;
        players.forEach(player => {
            if(player.name === username){
                renderTileMap(player);
            }
        });
    });
}

function processTileMapNavigation(e){
    e.preventDefault();
    const $tile = e.target.closest('.tile-map div[data-tile]');
    if(!$tile){
        return;
    }
    // do something here
}
