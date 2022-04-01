"use strict";

function processQueueState(){
    fetchFromServer(`/games/${_player.gameId}`,'GET')
        .then(game => {
            if(game.started){
                location.href = "select-pawn.html";
            }
            else {
                renderQueue(game);
                setTimeout(processQueueState, 1500);
            }
        })
        .catch(errorHandler);
}
