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
