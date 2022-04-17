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

// check if street is improved evenly with houses...
function canBuyHouse(tile){
    // also checks if tile has an actual street
    if(doIOwnTheStreet(tile.name) && retrieveMyBalance() >= tile.housePrice){
        const street = retrieveStreetWithOwnershipData(tile.name);
        const property = retrievePropertyWithOwnershipData(tile.name);

        for(const propertyOfStreet of street){
            // check if there is a property in the street "that is running behind" on house improvement
            if(propertyOfStreet.houseCount < property.houseCount || property.houseCount > 4 ||
                propertyOfStreet.hotelCount !== property.hotelCount || propertyOfStreet.mortgage ||
                property.hotelCount >= 1){
                return false;
            }
        }
        return true;
    }
    return false;
}

// check if street is sold evenly...
function canSellHouse(tile){
    // also checks if tile has an actual street
    if(doIOwnTheStreet(tile.name)){
        const street = retrieveStreetWithOwnershipData(tile.name);
        const property = retrievePropertyWithOwnershipData(tile.name);

        for(const propertyOfStreet of street){
            // check if there is a property in the street that has more houses than current property
            if(propertyOfStreet.houseCount > property.houseCount || property.houseCount <= 0 ||
                propertyOfStreet.hotelCount !== property.hotelCount || property.mortgage){
                return false;
            }
        }
        return true;
    }
    return false;
}


