"use strict";

function bankrupt() {
    fetchFromServer(`/games/${_player.gameId}/players/${_player.username}/bankruptcy`, "POST").catch(errorHandler);
}

function checkBankrupt() {
    if (_players[_player.username].bankrupt){
    //    loss screen
    }
}
