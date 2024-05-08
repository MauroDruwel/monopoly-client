"use strict";

function processQueueState(){
    fetchFromServer(`/games/${_player.gameId}`,'GET')
        .then(game => {
            if(game.started){
                location.href = "main-board.html";
            }
            else {
                renderQueue(game);
                setTimeout(processQueueState, 1500);
            }
        })
        .catch(errorHandler);
}
