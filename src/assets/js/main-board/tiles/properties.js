"use strict";

function processPropertyBack(name){
    const property = _tiles[retrieveTilePosition(name)];
    renderPropertyBack(property);
}

function processPropertyFront(name){
    const property = _tiles[retrieveTilePosition(name)];
    const owner = retrieveTileOwner(name);

    let ownerName = "none";
    let mortgage = "false";
    let houseCount = 0;
    let hotelCount = 0;

    if(owner){
        ownerName = owner.name;
        for(const ownedProperty of owner.properties){
            if(ownedProperty.property === convertUnderscoresToSpaces(name)){
                mortgage = ownedProperty.mortgage;
                houseCount = ownedProperty.houseCount;
                hotelCount = ownedProperty.hotelCount;
            }
        }
    }

    renderPropertyFront(property, ownerName, mortgage, houseCount, hotelCount);
}

function processProperty(name){
    processPropertyFront(name);
    processPropertyBack(name);
}
