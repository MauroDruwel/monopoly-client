"use strict";

function fetchGames(myfunction) {
    fetchFromServer('/games', 'GET').then(games => myfunction(games)).catch(errorHandler);
}
function getGameInformationByGameID(myfunction){
    _token.token = "Gay_133-MichielS1";
    _gameID.gameID = "Gay_133";
    fetchFromServer(`/games/${_gameID.gameID}`,'GET').then(response => myfunction(response)).catch(errorHandler);
}
function goToJoinCreate(){
    location.href = "join-create.html";
}
function refactorGameID(gameID){
    let array_of_characters_of_game_id = gameID.split("");
    for (let i = 0; i < 4 ; i++) {
        array_of_characters_of_game_id.pop()
    }
    return array_of_characters_of_game_id.join('');
}
