function fetchBankruptcy() {
    fetchFromServer(`/games/${_player.gameId}`, "GET").then(response => {
        checkBankrupt(response);
    }).catch(errorHandler);
}

function checkBankrupt(gameState) {
    const players = gameState.players;
    players.forEach(player => {
        if (player.bankrupt) {
            if (player.name === _player.username) {
                console.log(player.name, "you are bankrupt");
            } else {
                console.log(player.name, "is bankrupt");
            }
        } else {
            if (player.name === _player.username) {
                console.log(player.name, "you are fine");
            } else {
                console.log(player.name, "is fine");
            }
        }
    });
}

function bankrupt(playerName) {
    fetchFromServer(`/games/${_player.gameId}/players/${playerName}/bankruptcy`, "POST").catch(errorHandler);
}
