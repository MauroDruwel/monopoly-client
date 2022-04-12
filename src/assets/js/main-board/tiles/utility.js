"use strict";

function processUtility(name){
    const owner = retrieveTileOwner(name);

    let ownerName = "none";
    let mortgage = "false";
    if(owner){
        ownerName = owner.name;
        for(const ownedProperty of owner.properties){
            if(ownedProperty.property === convertUnderscoresToSpaces(name)){
                mortgage = ownedProperty.mortgage;
            }
        }
    }
    const utility = _tiles[tilePosition(name)];
    renderUtility(utility, ownerName, mortgage);
}


