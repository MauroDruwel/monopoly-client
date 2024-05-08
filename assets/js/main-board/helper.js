
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

function isNewPlayer(prevGame) {
    return prevGame['turns'].at(-1)['player'] !== _game['turns'].at(-1)['player'];
}

function isNewMove(prevGame) {
    return prevGame['turns'].at(-1)['moves'].at(-1)['tile'] !== _game['turns'].at(-1)['moves'].at(-1)['tile'];
}

function hasPropertyMortgage(property){
    return property.mortgage;
}

function hasPropertyNotEnoughImprovementsToBuyHotel(property){
    return property.houseCount < 4 || property.hotelCount >= 1;
}

function hasPropertyOfStreetLessHotelsThanProperty(property,propertyOfStreet){
    return propertyOfStreet.hotelCount < property.hotelCount;
}

function hasPropertyNotEnoughImprovementsToBuyHouse(property){
    return property.houseCount >= 4 || property.hotelCount >= 1;
}

function hasPropertyOfStreetLessHousesThanProperty(property,propertyOfStreet){
    return propertyOfStreet.houseCount < property.houseCount;
}

function hasPropertyOfStreetMoreHousesThanProperty(property,propertyOfStreet){
    return propertyOfStreet.houseCount > property.houseCount;
}

function hasPropertyOfStreetMoreHotelsThanProperty(property,propertyOfStreet){
    return propertyOfStreet.hotelCount > property.hotelCount;
}



function canBuyHouse(tile) {
    if (doIOwnTheStreet(tile.name) && retrieveMyBalance() >= tile.housePrice) {
        const street = retrieveStreetWithOwnershipData(tile.name);
        const property = retrievePropertyWithOwnershipData(tile.name);
        for (const propertyOfStreet of street) {
            if (checkImprovementOfPropertyToBuyHouse(property,propertyOfStreet) || hasPropertyMortgage(propertyOfStreet)){
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
            if (checkPropertyImprovementToSellHouse(property, propertyOfStreet) || hasPropertyMortgage(property)) {
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
            if (checkImprovementOfPropertyToBuyHotel(property, propertyOfStreet) || hasPropertyMortgage(propertyOfStreet)){
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
            if (checkPropertyImprovementToSellHotel(property, propertyOfStreet) || hasPropertyMortgage(property)) {
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
        if (hasPropertyMortgage(property)){
            return false;
        }
        const street = retrieveStreetWithOwnershipData(tile.name);
            for(const propertyOfStreet of street){
                if(checkIfThereAreNoHousesAndHotels(propertyOfStreet)){
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
        if (hasPropertyMortgage(property)) {
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
            if (!hasPropertyMortgage(property)) {
                return true;
            }
        }
    }
    return false;
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


function checkImprovementOfPropertyToBuyHotel(property, propertyOfStreet) {
    return (
        hasPropertyOfStreetLessHotelsThanProperty(property,propertyOfStreet) ||
        hasPropertyNotEnoughImprovementsToBuyHotel(property) ||
        (propertyOfStreet.houseCount < 4 && propertyOfStreet.hotelCount === 0)
    );
}

function checkImprovementOfPropertyToBuyHouse(property,propertyOfStreet){
    return (
        hasPropertyOfStreetLessHousesThanProperty(property,propertyOfStreet) ||
        hasPropertyNotEnoughImprovementsToBuyHouse(property) ||
        propertyOfStreet.hotelCount !== property.hotelCount
    );
}

function checkPropertyImprovementToSellHouse(property, propertyOfStreet){
    return hasPropertyOfStreetMoreHousesThanProperty(property,propertyOfStreet) ||
        property.houseCount <= 0 || propertyOfStreet.hotelCount !== property.hotelCount;
}

function checkPropertyImprovementToSellHotel(property, propertyOfStreet){
    return  hasPropertyOfStreetMoreHotelsThanProperty(property, propertyOfStreet) || property.hotelCount <= 0;
}

function checkIfThereAreNoHousesAndHotels(propertyOfStreet){
    return propertyOfStreet.hotelCount !== 0 || propertyOfStreet.houseCount !== 0;
}

function checkIfThereIsANewMoveByTheSameOrOtherPlayer(prevGame){
    return isNewPlayer(prevGame) || (isNewMove(prevGame) && !isNewPlayer(prevGame));
}
