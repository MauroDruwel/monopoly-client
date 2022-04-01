"use strict";

function processPropertyBack(property){
    fetchFromServer(`/tiles/${convertSpaceToDash(property)}`, "GET").then(tile => {
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
