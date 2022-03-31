"use strict";

function processSelectedPawn(e){
    const $figure = e.target.closest('#select-pawn figure[data-pawn]');
    if(!$figure){
        return;
    }

    _player.pawn = $figure.dataset.pawn;
    saveToStorage("_player", _player);

    location.href = "main-board.html"; // redirect to main-board
}
