"use strict";
function getGameInformationByGameID(myfunction){
    fetchFromServer(`/games/${_player.gameId}`,'GET').then(response => myfunction(response)).catch(errorHandler);
}

function beautifyId(id){
    return capitalizeFirstLetter(id.replace(/_/g, ' '));
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getTiles(){
    fetchFromServer("/tiles", "GET").then(response => {
        getProperties(response);
    }).catch(errorHandler);

}
