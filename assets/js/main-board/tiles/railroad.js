"use strict";

function processRailroad(name){
    const owner = retrieveOwner(name);

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
    const railroad = _tiles[retrieveTilePosition(name)];
    renderRailroad(railroad, ownerName, mortgage);
}
