"use strict";

function processAvailableGames(e){
    e.preventDefault();

    const numberOfPlayers = document.querySelector("#number-of-players").value;

    if(!parseInt(numberOfPlayers)){
        return;
    }

    retrieveAvailableGames(numberOfPlayers)
        .then(gamesObject => {
            const gamesList = gamesObject.games;
        if(gamesList.length > 0){
            renderGames(gamesList);
        }
        else {
            hideGames();
        }
    });
}

function processConnectionForm(e){
    e.preventDefault();

    const username = document.querySelector("#username").value;
    const numberOfPlayers = document.querySelector("#number-of-players").value;

    const $areGamesLoaded = document.querySelector('#available-games td input[type="radio"]');
    const $selectedGame = document.querySelector('#available-games td input[type="radio"]:checked');

    if($areGamesLoaded && $selectedGame){
        joinGame($selectedGame.value, username);
    }
    else{
        createGame(numberOfPlayers, username);
    }

}


async function retrieveAvailableGames(numberOfPlayers){
    return fetchFromServer(`/games?prefix=${_config.gamePrefix}&numberOfPlayers=${numberOfPlayers}&started=false`, 'GET');
}

function joinGame(gameId, username){
    const requestBody = {
        "playerName": username
    };

    fetchFromServer(`/games/${gameId}/players`, 'POST', requestBody)
        .then(response => {
            _player.token = response.token;
            _player.username = username;
            _player.gameId = gameId;
            saveToStorage("_player", _player);
        })
        .then(() => {
            location.href = "queue.html";
        });

}

function createGame(numberOfPlayers, username) {
    const bodyParams = {
        "prefix": _config.gamePrefix,
        "numberOfPlayers": parseInt(numberOfPlayers)
    };

    fetchFromServer('/games', 'POST', bodyParams)
        .then(game => joinGame(game.id, username));
}
