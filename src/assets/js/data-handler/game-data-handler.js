"use strict";

/* retrieve data from game */

function retrieveGame(){
    return fetchFromServer(`/games/${_player.gameId}`, "GET").then(game => {
        _game = {}; // empty object
        for (const key in game){
            _game[key] = game[key];
        }
    }).then(() => {
        saveToStorage("_game", _game);
    }).catch(errorHandler);
}

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

function retrievePropertyWithOwnershipData(propertyName){
    for(const player of _game.players){
        for(const property of player.properties){
            if(property.property === propertyName){
                return property;
            }
        }
    }
    return null;
}
