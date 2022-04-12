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

function tilePosition(name){
    for(const tile of _tiles){
        if(tile.nameAsPathParameter === convertSpacesToUnderscores(name)){
            return tile.position;
        }
    }
    return null;
}

function retrieveTileOwner(tileName){
    _players.forEach(player => {
        for (const ownedProperty of player.properties){
            if(ownedProperty.property === convertUnderscoresToSpaces(tileName)){
                return player;
            }
        }
    });
    return null;
}
