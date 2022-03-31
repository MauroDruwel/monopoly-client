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
