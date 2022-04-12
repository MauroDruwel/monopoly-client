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


/* retrieve data from tiles */

function retrieveTilePosition(name){
    for(const tile of _tiles){
        if(tile.nameAsPathParameter === convertSpacesToUnderscores(name)){
            return tile.position;
        }
    }
    return null;
}

/* retrieve data from game */

function retrievePlayer(username){
    for(const player of _game["players"]){
        if(player.name === username){
            return player;
        }
    }
    return null;
}

function retrieveOwner(tilename){
    for(const player of _game["players"]){
        for (const ownedProperty of player.properties){
            if(ownedProperty.property === convertUnderscoresToSpaces(tilename)){
                return player;
            }
        }
    }
    return null;
}

function retrievePlayersOnTile(tilename){
    const players = [];
    for(const player of _game["players"]){
        if(player.currentTile === convertUnderscoresToSpaces(tilename)){
            players.push(player);
        }
    }
    return players;
}
