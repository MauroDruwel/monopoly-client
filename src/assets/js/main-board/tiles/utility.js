"use strict";

function processUtilityTile(name){
    const owner = retrieveTileOwner(name).name;
    const utility = _tiles[tilePosition(name)];
    renderUtilityTile(utility, owner);
}


