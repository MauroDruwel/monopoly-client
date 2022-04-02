"use strict";

function processPropertyBack(property){
    fetchFromServer(`/tiles/${convertSpacesToUnderscores(property)}`, "GET").then(tile => {
        renderPropertyBack(tile);
    }).catch(errorHandler);
}

function processPropertyFront(property){
    fetchFromServer(`/games/${_player.gameId}`, "GET").then(game => {
        renderPropertyFront(property, game);
    }).catch(errorHandler);
}

function processProperty(property){
    processPropertyFront(property);
    processPropertyBack(property);
}
