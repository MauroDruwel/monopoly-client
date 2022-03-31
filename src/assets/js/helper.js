"use strict";
function getGameInformationByGameID(myfunction){
    fetchFromServer(`/games/${_player.gameId}`,'GET').then(response => myfunction(response)).catch(errorHandler);
}

function beautifyId(id){
    return capitalizeFirstLetter(id.replace(/_/g, ' '));
}

function convertSpaceToDash(string){
    return capitalizeFirstLetter(string.replace(/ /g,"_"));

}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getTiles(){
    fetchFromServer("/tiles", "GET").then(response => {
        getProperties(response);
    }).catch(errorHandler);

}

function getSpecificTile(tilename){
    fetchFromServer(`/tiles/${tilename}`, "GET").then(response => {
        renderFrondTiles(response);
    }).catch(errorHandler);
}
