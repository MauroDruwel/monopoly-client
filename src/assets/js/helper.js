"use strict";

function fetchGames(myfunction) {
    fetchFromServer('/games', 'GET').then(games => myfunction(games)).catch(errorHandler);
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
