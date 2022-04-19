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
    if(prevGame['turns'].length >= 1){
        // check if there is a new move by the same player or a new move by another player
        if(newPlayer(prevGame) || (newMove(prevGame) && !newPlayer(prevGame))){
            // collect rent only once on new turn
            _player.collectedRent = false;

            // show tile of a players most recent turn
            const currentTile = retrievePlayer(prevGame.currentPlayer).currentTile;
            _player.carousel = retrieveTilePosition(currentTile);
            rerender();
        }
    }
}

function checkLogState(){
    const res = [];
    let log = "";
    let j = -6;
    if (_game.turns.length !== 0){
        if (_game.turns.length <= 6){
            j = -_game.turns.length;
        }
        for (let i = -1; i >= j; i--) {
            _game.turns.at(i).moves.forEach(move => {
                log = `${_game.turns.at(i).player} landed on ${move.tile}: ${move.description}`;
                res.push(log);
                renderLog(res);
            });
        }

    }
}
