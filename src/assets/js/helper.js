"use strict";

function fetchGames(myfunction) {
    fetchFromServer('/games', 'GET').then(games => myfunction(games)).catch(errorHandler);
}
