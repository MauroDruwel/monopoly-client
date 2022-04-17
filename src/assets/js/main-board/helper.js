/* ---------------- helpers main-board ------------------- */
/* ---------------- part of main-board ------------------- */

/* ######## boolean helpers ######## */

function isItMyTurn(){
    return _game.currentPlayer === _player.username;
}

function isDirectSaleTileOnCarousel(){
    return _game.directSale === _tiles[_player.carousel].name;
}

function doIOwnTile(tilename){
    const owner = retrieveOwner(tilename);
    if(owner){
        return owner.name === _player.username;
    }
    return null;
}

function doIOwnTheStreet(property){
    const street = retrieveStreetWithTileData(property);
    let numberOfPropertiesIOwnInStreet = 0;
    if(Object.keys(street).length >= 1){
        street.forEach(tile => {
            const owner = retrieveOwner(tile.name);
            if(owner && owner.name === _player.username){
                numberOfPropertiesIOwnInStreet++;
            }
        });
        if(street[0].groupSize === numberOfPropertiesIOwnInStreet){
            return true;
        }
    }
    return false;
}


/* ######## set state helpers ######## */

