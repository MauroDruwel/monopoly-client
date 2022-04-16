"use strict";

/* retrieve data from tiles */

function retrieveTiles() {
    return fetchFromServer(`/tiles`, "GET").then(tiles => {
        _tiles = []; // empty array
        tiles.forEach(tile => {
            _tiles.push(tile);
        });
    }).then(() => {
        saveToStorage("_tiles", _tiles);
    }).catch(errorHandler);
}

function retrieveTilePosition(name){
    for(const tile of _tiles){
        if(tile.nameAsPathParameter === convertSpacesToUnderscores(name)){
            return tile.position;
        }
    }
    return null;
}

function retrieveTileByName(name){
    for(const tile of _tiles){
        if(tile.nameAsPathParameter === convertSpacesToUnderscores(name)){
            return tile;
        }
    }
    return null;
}

function retrieveStreetWithTileDataByColor(color){
    const street = [];
    _tiles.forEach(tile => {
        if(tile.streetColor === color.toUpperCase()){
            street.push(tile);
        }
    });
    return street;
}

function retrieveStreetWithTileDataByProperty(name){
    const property =  retrieveTileByName(name);
    if(property.type === 'street'){
        const color = property.streetColor;
        return retrieveStreetWithTileDataByColor(color);
    }
    return [];
}
