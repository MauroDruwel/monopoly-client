/* ---------------- check game state ------------------- */
/* ---------------- part of main-board.js ------------------- */


function checkEndState(){
    // check for winner or loser
    if (retrievePlayer(_player.username).bankrupt){
        location.href = "loss-screen.html";
    }
    else if (_game.winner === _player.username) {
        location.href = "winner-screen.html";
    }
}

function checkAuctionState(){
    return retrieveBankAuctions().then(bankAuctions => {
        for(const player of _game.players) {
            retrievePlayerAuctions(player.name).then(playerAuctions => {
                if(Object.keys(bankAuctions).length >= 1 || Object.keys(playerAuctions).length >= 1){
                    navigateMainBoard("auction");
                }
            }).catch(errorHandler);
        }
    }).catch(errorHandler);
}

function checkTurnState(prevGame){
    // check if there is a new move by the same player or a new move by another player
    if(newPlayer(prevGame)|| (newMove(prevGame) && !newPlayer(prevGame))){
        // collect rent only once on new turn
        _player.collectedRent = false;
        
        // show tile of a players most recent turn
        const currentTile = retrievePlayer(prevGame.currentPlayer).currentTile;
        console.log(prevGame.currentPlayer, currentTile);
        _player.carousel = retrieveTilePosition(currentTile);
        rerender();
    }
}
