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

function retrieveTileOnName(name){
    for(const tile of _tiles){
        if(tile.nameAsPathParameter === convertSpacesToUnderscores(name)){
            return tile;
        }
    }
    return null;
}
