"use strict";

function processAvailableGames(e){
    e.preventDefault();

    const numberOfPlayers = document.querySelector("#number-of-players").value;

    if(!parseInt(numberOfPlayers)){
        return;
    }

    retrieveAvailableGames(numberOfPlayers).then(games => {
        if(games.length > 0){
            renderGames(games);
        }
        else {
            hideGames();
        }
    });
}



async function retrieveAvailableGames(numberOfPlayers){
    return await fetchFromServer(`/games?prefix=${_config.gamePrefix}&numberOfPlayers=${numberOfPlayers}&started=false`, 'GET');
}

