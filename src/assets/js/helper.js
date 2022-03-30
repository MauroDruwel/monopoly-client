"use strict";

function fetchGames(myfunction) {
    fetchFromServer('/games', 'GET').then(games => myfunction(games)).catch(errorHandler);
}

function beautifyId(id){
    return capitalizeFirstLetter(id.replace(/_/g, ' '));
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
