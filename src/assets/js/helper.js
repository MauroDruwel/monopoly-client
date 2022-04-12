"use strict";

/* String Convert Helpers */
function beautifyId(id){
    return capitalizeFirstLetter(id.replace(/_/g, ' '));
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function convertSpacesToUnderscores(string){
    return string.replace(/ /g, "_");
}

function convertUnderscoresToSpaces(string){
    return string.replace(/_/g, " ");
}

/* Event Helpers */

function addEventListenerToElements(type, handler, selector){
    const $elements = document.querySelectorAll(selector);
    $elements.forEach(($element) => $element.addEventListener(type, handler));
}


/* Getters */

function retrieveTilePosition(name){
    for(const tile of _tiles){
        if(tile.nameAsPathParameter === convertSpacesToUnderscores(name)){
            return tile.position;
        }
    }
    return null;
}

function retrieveTileOwner(tileName){
    for(const name of Object.keys(_players)){
        for (const ownedProperty of _players[name].properties){
            if(ownedProperty.property === convertUnderscoresToSpaces(tileName)){
                return _players[name];
            }
        }
    }
    return null;
}

function retrievePlayersOnTile(tileName){
    const players = [];
    for(const name of Object.keys(_players)){
        if(_players[name].currentTile === convertUnderscoresToSpaces(tileName)){
            players.push(_players[name]);
        }
    }
    return players;
}
