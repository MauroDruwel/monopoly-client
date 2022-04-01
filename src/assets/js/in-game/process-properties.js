"use strict";

function processPropertyBack(property){
    fetchFromServer(`/tiles/${convertSpacesToUnderscores(property)}`, "GET").then(tile => {
        renderPropertyBack(tile);
    });
}

function processPropertyFront(property){
    fetchFromServer(`/games/dummy`, "GET").then(game => {
        renderPropertyFront(property, game);
    }).catch(errorHandler);
}

function processProperty(property){
    processPropertyFront(property);
    processPropertyBack(property);
}
