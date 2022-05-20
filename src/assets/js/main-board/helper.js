
function isItMyTurn() {
    return _game.currentPlayer === _player.username;
}

function isDirectSaleTileOnCarousel() {
    return _game.directSale === _tiles[_player.carousel].name;
}

function doIOwnTile(tilename) {
    const owner = retrieveOwner(tilename);
    if (owner) {
        return owner.name === _player.username;
    }
    return null;
}

function doIOwnTheStreet(property) {
    const street = retrieveStreetWithTileData(property);
    let numberOfPropertiesIOwnInStreet = 0;
    if (Object.keys(street).length >= 1) {
        street.forEach(tile => {
            const owner = retrieveOwner(tile.name);
            if (owner && owner.name === _player.username) {
                numberOfPropertiesIOwnInStreet++;
            }
        });
        if (street[0].groupSize === numberOfPropertiesIOwnInStreet) {
            return true;
        }
    }
    return false;
}

function newPlayer(prevGame) {
    return prevGame['turns'].at(-1)['player'] !== _game['turns'].at(-1)['player'];
}

function newMove(prevGame) {
    return prevGame['turns'].at(-1)['moves'].at(-1)['tile'] !== _game['turns'].at(-1)['moves'].at(-1)['tile'];
}



function canBuyHouse(tile) {
    if (doIOwnTheStreet(tile.name) && retrieveMyBalance() >= tile.housePrice) {
        const street = retrieveStreetWithOwnershipData(tile.name);
        const property = retrievePropertyWithOwnershipData(tile.name);
        for (const propertyOfStreet of street) {
            if (checkIfPropertyIsBehindOnHouseImprovement(property,propertyOfStreet)){
                return false;
            }
        }
        return true;
    }
    return false;
}

function canSellHouse(tile) {
    if (doIOwnTheStreet(tile.name)) {
        const street = retrieveStreetWithOwnershipData(tile.name);
        const property = retrievePropertyWithOwnershipData(tile.name);

        for (const propertyOfStreet of street) {
            if (checkIfPropertyInStreetHasMoreHouses(propertyOfStreet,property)) {
                return false;
            }
        }
        return true;
    }
    return false;
}

function canBuyHotel(tile) {
    if (doIOwnTheStreet(tile.name) && retrieveMyBalance() >= tile.housePrice) {
        const street = retrieveStreetWithOwnershipData(tile.name);
        const property = retrievePropertyWithOwnershipData(tile.name);

        for (const propertyOfStreet of street) {
            if (checkIfPropertyIsBehindOnHotelImprovement(property, propertyOfStreet)){
                return false;
            }
        }
        return true;
    }
    return false;
}

function canSellHotel(tile) {
    if (doIOwnTheStreet(tile.name)) {
        const street = retrieveStreetWithOwnershipData(tile.name);
        const property = retrievePropertyWithOwnershipData(tile.name);

        for (const propertyOfStreet of street) {
            if (checkIfPropertyIsRunningBehindOnHotelImprovement(propertyOfStreet,property)) {
                return false;
            }
        }
        return true;
    }
    return false;
}

function canTakeMortgage(tile){
    if(doIOwnTile(tile.name)){
        const property = retrievePropertyWithOwnershipData(tile.name);
        if (property.mortgage){
            return false;
        }
        const street = retrieveStreetWithOwnershipData(tile.name);
            for(const propertyOfStreet of street){
                if(checkIfThereAreNoHousesAndHotelsAndNoMortgage(propertyOfStreet,property)){
                    return false;
                }
            }
            return true;
    }
    return false;
}


function canSettleMortgage(tile) {
    if (doIOwnTile(tile.name) && retrieveMyBalance() >= (parseInt(tile.mortgage) * 1.1)) {
        const property = retrievePropertyWithOwnershipData(tile.name);
        if (property.mortgage) {
            return true;
        }
    }
    return false;
}

function canBeAuctioned(tile) {
    if (doIOwnTile(tile.name)) {
        const street = retrieveStreetWithOwnershipData(tile.name);
        for (const propertyOfStreet of street) {
            if (checkIfThereAreNoHousesAndHotels(propertyOfStreet)){
                return false;
            }
        }
        return true;
    }
    return false;
}

function canCollectRent() {
    const turns = _game['turns'];
    if (Object.keys(turns).length >= 1 && !_player.collectedRent) {
        const debtorName = turns.at(-1)['player'];
        const tileName = turns.at(-1)['moves'].at(-1)['tile'];

        if (doIOwnTile(tileName) && debtorName !== _player.username) {
            const property = retrievePropertyWithOwnershipData(tileName);
            if (!property.mortgage) {
                return true;
            }
        }
    }
    return false;
}

function checkIfPropertyIsBehindOnHotelImprovement(property, propertyOfStreet) {
    return (
        propertyOfStreet.hotelCount < property.hotelCount ||
        property.houseCount < 4 ||
        (propertyOfStreet.houseCount < 4 && propertyOfStreet.hotelCount === 0) ||
        propertyOfStreet.mortgage ||
        property.hotelCount >= 1
    );
}

function checkIfPropertyIsBehindOnHouseImprovement(property,propertyOfStreet){
    return (
        propertyOfStreet.houseCount < property.houseCount ||
        property.houseCount > 4 ||
        propertyOfStreet.hotelCount !== property.hotelCount ||
        propertyOfStreet.mortgage ||
        property.hotelCount >= 1
    );
}

function checkIfPropertyInStreetHasMoreHouses(propertyOfStreet,property){
    return propertyOfStreet.houseCount > property.houseCount || property.houseCount <= 0 ||
        propertyOfStreet.hotelCount !== property.hotelCount || property.mortgage;
}

function checkIfPropertyIsRunningBehindOnHotelImprovement(propertyOfStreet,property){
    return propertyOfStreet.hotelCount > property.hotelCount || property.hotelCount <= 0 || property.mortgage;
}

function checkIfThereAreNoHousesAndHotelsAndNoMortgage(propertyOfStreet,property){
    return propertyOfStreet.hotelCount !== 0 || propertyOfStreet.houseCount !== 0 || property.mortgage;
}
function checkIfThereAreNoHousesAndHotels(propertyOfStreet){
    return propertyOfStreet.hotelCount !== 0 || propertyOfStreet.houseCount !== 0;
}
function checkIfThereIsANewMoveByTheSameOrOtherPlayer(prevGame){
    return newPlayer(prevGame) || (newMove(prevGame) && !newPlayer(prevGame));
}

function canIUseAJailCard() {
    return retrieveMyAmountOfJailCards() > 0 && retrieveIfIAmInPrison() === true;
}

function canIPayForPrisonFee(){
    return retrieveMyBalance() > 50 && retrieveIfIAmInPrison() === true;
}
function isItMyTurnAndCanIStillBuyThisProperty(){
    return isItMyTurn() && isDirectSaleTileOnCarousel() && _game.directSale != null;
}
