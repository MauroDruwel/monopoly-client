"use strict";

function processUtilityTile(name){
    const owner = retrieveUtilityOwner(name);
    renderUtilityTile(name, owner);
}

function retrieveUtilityOwner(name){
    for(const player of _players){
        for (const ownedProperty of player.properties){
            if(ownedProperty.property === convertUnderscoresToSpaces(name)){
                return player.name;
            }
        }
    }
    return "None";
}
