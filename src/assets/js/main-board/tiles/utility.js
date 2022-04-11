"use strict";

function processUtilityTile(name){
    const owner = retrieveTileOwner(name);
    let ownerName = "None";
    if(owner){
        ownerName = owner.name;
    }
    const utility = _tiles[tilePosition(name)];
    renderUtilityTile(utility, ownerName);
}


