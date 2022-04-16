"use strict";

let landedTileShown = false;

async function startGame(){
    await retrieveTiles(); // fetch board tiles
    await retrieveGame(); // fetch game data
}

async function reloadGame() {
    // fetch game data here:
    await retrieveGame();

    checkGameState();
    setGameState();
    rerender();

    enableOrDisableButtons();

    // this does not reinitialize initMainBoard!
    setTimeout(reloadGame, 1000);
}

function checkGameState() {
    checkEndState();
    // add check state here
}

function setGameState(){
    setDiceRollState();
    setBuyPropertyState();
    setBuyHouseState();
    setSellHouseState();
    setBuyHotelState();
    setSellHotelState();
    setTakeMortgageState();
    // add set state here
}

function rerender(){
    renderCarousel();
    renderDiceRoll();
    processTileMap(_player.username);
    // add component you would like to reload here
}

function enableOrDisableButtons(){
    // disable buttons that don't contain .active class
    document.querySelectorAll('.button:not(.active)').forEach($button => {
        $button.disabled = true;
    });
    // enable buttons that do contain .active class
    document.querySelectorAll('.button.active').forEach($button => {
        $button.disabled = false;
    });
}

/* ---------------- check game state ------------------- */

function checkEndState(){
    // check for winner or loser
    if (retrievePlayer(_player.username).bankrupt){
        location.href = "loss-screen.html";
    }
    else if (_game.winner === _player.username) {
        location.href = "winner-screen.html";
    }
}

function checkAuctionState(){
    return retrieveBankAuctions().then(bankAuctions => {
        for(const player of _game.players) {
            retrievePlayerAuctions(player.name).then(playerAuctions => {
                if(bankAuctions || playerAuctions){
                    return true
                }
                }).catch(errorHandler);
        }
        return false;
    }).catch(errorHandler);
}

/* ---------------- set game state ------------------- */

function setDiceRollState(){
    if(isItMyTurn() && _game.canRoll){
        document.querySelector('[data-action="roll-dice"]').classList.add('active');
    }
    else {
        document.querySelector('[data-action="roll-dice"]').classList.remove('active');
    }

    // move all players to tile where current player landed on
    if(!landedTileShown && !_game.canRoll){
        const currentTile = retrievePlayer(_game.currentPlayer).currentTile;
        _player.carousel = retrieveTilePosition(currentTile);
        landedTileShown = true;
    }
    else if(_game.canRoll){
        landedTileShown = false;
    }
}

function setBuyPropertyState(){
    if(isItMyTurn() && isDirectSaleTileOnCarousel() && _game.directSale != null){
        if(retrieveMyBalance() >= retrieveTileByName(retrieveMyCurrentTileName()).cost){
            document.querySelector('[data-navigate="buy-property"]').classList.add('active');
        }
        else {
            document.querySelector('[data-navigate="buy-property"]').classList.remove('active');
        }
        document.querySelector('[data-action="dont-buy-property"]').classList.add('active');
    }
    else {
        document.querySelector('[data-navigate="buy-property"]').classList.remove('active');
        document.querySelector('[data-action="dont-buy-property"]').classList.remove('active');
    }
}

function setBuyHouseState(){
    const tile = retrieveTileOnCarousel();
    if(canBuyHouse(tile)){
        document.querySelector('[data-navigate="buy-house"]').classList.add('active');
    }
    else {
        document.querySelector('[data-navigate="buy-house"]').classList.remove('active');
    }
}

function setSellHouseState(){
    const tile = retrieveTileOnCarousel();
    if(canSellHouse(tile)){
        document.querySelector('[data-navigate="sell-house"]').classList.add('active');
    }
    else {
        document.querySelector('[data-navigate="sell-house"]').classList.remove('active');
    }
}

function setBuyHotelState(){
    const tile = retrieveTileOnCarousel();
    if(canBuyHotel(tile)){
        document.querySelector('[data-navigate="buy-hotel"]').classList.add('active');
    }
    else {
        document.querySelector('[data-navigate="buy-hotel"]').classList.remove('active');
    }
}

function setSellHotelState() {
    const tile = retrieveTileOnCarousel();
    if (canSellHotel(tile)) {
        document.querySelector('[data-navigate="sell-hotel"]').classList.add('active');
    } else {
        document.querySelector('[data-navigate="sell-hotel"]').classList.remove('active');
    }
}

function setTakeMortgageState() {
    const tile = retrieveTileOnCarousel();
    if (canTakeMortgage(tile)) {
        document.querySelector('[data-navigate="take-mortgage"]').classList.add('active');
    } else {
        document.querySelector('[data-navigate="take-mortgage"]').classList.remove('active');
    }
}

/* ---------------- main board helpers ---------------- */

function isItMyTurn(){
    return _game.currentPlayer === _player.username;
}

function isDirectSaleTileOnCarousel(){
    return _game.directSale === _tiles[_player.carousel].name;
}

function retrieveTileOnCarousel(){
    return _tiles[_player.carousel];
}

function doIOwnTile(tilename){
    const owner = retrieveOwner(tilename);
    if(owner){
        return owner.name === _player.username;
    }
    return null;
}

function retrieveStreetWithOwnershipDataByProperty(propertyName){
    const properties = retrievePlayer(_player.username).properties;
    const streetFromTiles = retrieveStreetWithTileDataByProperty(propertyName);
    const streetFromGame = [];

    if(Object.keys(streetFromTiles).length >= 1){
        streetFromTiles.forEach(propertyFromTiles => {
            properties.forEach(propertyFromProperties => {
                if(propertyFromTiles.name === propertyFromProperties.property){
                    streetFromGame.push(propertyFromProperties);
                }
            });
        });
    }
    return streetFromGame;
}

// check if street is improved evenly with houses...
function canBuyHouse(tile){
    if(doIOwnTheStreet(tile.name) && retrieveMyBalance() >= tile.housePrice){
        const street = retrieveStreetWithOwnershipDataByProperty(tile.name);
        const property = retrievePropertyWithOwnershipData(tile.name);

        for(const propertyOfStreet of street){
            // check if there is a property in the street "that is running behind" on house improvement
            if(propertyOfStreet.houseCount < property.houseCount || property.houseCount > 4 ||
                propertyOfStreet.hotelCount !== property.hotelCount){
                return false;
            }
        }
        return true;
    }
    return false;
}

// check if street is improved evenly with hotels...
function canBuyHotel(tile){
    if(doIOwnTheStreet(tile.name) && retrieveMyBalance() >= tile.housePrice){
        const street = retrieveStreetWithOwnershipDataByProperty(tile.name);
        const property = retrievePropertyWithOwnershipData(tile.name);

        for(const propertyOfStreet of street){
            // check if there is a property in the street "that is running behind" on hotel improvement
            if(propertyOfStreet.hotelCount < property.hotelCount || property.houseCount < 4 ||
                (propertyOfStreet.houseCount < 4 && propertyOfStreet.hotelCount === 0)){
                return false;
            }
        }
        return true;
    }
    return false;
}

// check if street is sold evenly...
function canSellHouse(tile){
    if(doIOwnTheStreet(tile.name)){
        const street = retrieveStreetWithOwnershipDataByProperty(tile.name);
        const property = retrievePropertyWithOwnershipData(tile.name);

        for(const propertyOfStreet of street){
            // check if there is a property in the street that has more houses than current property
            if(propertyOfStreet.houseCount > property.houseCount || property.houseCount <= 0 ||
                propertyOfStreet.hotelCount !== property.hotelCount){
                return false;
            }
        }
        return true;
    }
    return false;
}

// check if street is sold evenly...
function canSellHotel(tile){
    if(doIOwnTheStreet(tile.name)){
        const street = retrieveStreetWithOwnershipDataByProperty(tile.name);
        const property = retrievePropertyWithOwnershipData(tile.name);

        for(const propertyOfStreet of street){
            // check if there is a property in the street "that is running behind" on hotel improvement
            if(propertyOfStreet.hotelCount > property.hotelCount || property.hotelCount <= 0){
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
        const street = retrieveStreetWithOwnershipDataByProperty(tile.name);

        for(const propertyOfStreet of street){
            // check if there is a property in the street "that is running behind" on hotel improvement
            if(propertyOfStreet.hotelCount !== 0 || propertyOfStreet.houseCount !== 0 || property.mortgage){
                return false;
            }
        }
        return true;
    }
    return false;
}

function doIOwnTheStreet(property){
    const street = retrieveStreetWithTileDataByProperty(property);
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

function retrieveMyCurrentTileName(){
    return retrievePlayer(_player.username).currentTile;
}

function retrieveMyBalance(){
    return retrievePlayer(_player.username).money;
}

/* ---------------- event handlers ---------------- */

function playerAction(action){
    const tile = retrieveTileOnCarousel();
    switch (action){
        case "roll-dice":
            rollDice();
            break;
        case "buy-property":
            buyProperty(tile.name);
            break;
        case "dont-buy-property":
            dontBuyProperty(tile.name);
            // bank auction should start, players redirected to auction with checkAuctionState
            break;
        case "buy-house":
            buyHouse(tile.name);
            break;
        case "sell-house":
            sellHouse(tile.name);
            break;
        case "buy-hotel":
            buyHotel(tile.name);
            break;
        case "sell-hotel":
            sellHotel(tile.name);
            break;
        case "take-mortgage":
            takeMortgage(tile.name);
            break;
        default:
            throw "Unknown action";
    }
}

function navigateMainBoard(navigation){
    const tile = retrieveTileOnCarousel();
    switch (navigation){
        case "home":
            // make home board visible
            addClassToElements('#main-board > section', 'hidden');
            document.querySelector('#home-board').classList.remove('hidden');
            break;
        case "buy-property":
            renderBuyProperty(tile);
            break;
        case "buy-house":
            renderBuyHouse(tile);
            break;
        case "sell-house":
            renderSellHouse(tile);
            break;
        case "buy-hotel":
            renderBuyHotel(tile);
            break;
        case "sell-hotel":
            renderSellHotel(tile);
            break;
        case "take-mortgage":
            renderTakeMortgage(tile);
            break;
        case "setup-auction":
            break;
        case "auction":
            break;
        default:
            throw "Unknown navigation";
    }
}










/* --------------------------------------------------------------------------------------------------- */
/* ------------------------------------------ monopoly actions --------------------------------------- */
/* --------------------------------------------------------------------------------------------------- */


// ###################################### Turn Management ##############################################
function bankrupt() {
    fetchFromServer(`/games/${_player.gameId}/players/${_player.username}/bankruptcy`, "POST").catch(errorHandler);
}

function rollDice(){
    if(isItMyTurn() && _game.canRoll){
        fetchFromServer(`/games/${_player.gameId}/players/${_player.username}/dice`, "POST").catch(errorHandler);
    }
}


// ####################################### Tax Management ##############################################
function estimateTax(){
    fetchFromServer(`/games/${_player.gameId}/players/${_player.username}/tax/estimate`, "POST").catch(errorHandler);
}

function computeTax(){
    fetchFromServer(`/games/${_player.gameId}/players/${_player.username}/tax/compute`, "POST").catch(errorHandler);
}


// ####################################### Buying Property ##############################################
function buyProperty(property){
    if(!retrieveOwner(property)){
        fetchFromServer(`/games/${_player.gameId}/players/${_player.username}/properties/${property}`, "POST").catch(errorHandler);
    }
}

function dontBuyProperty(property){
    if(!retrieveOwner(property)){
        fetchFromServer(`/games/${_player.gameId}/players/${_player.username}/properties/${property}`, "DELETE").catch(errorHandler);
    }
}


// ##################################### Improving Property ##############################################
function buyHouse(property){
    fetchFromServer(`/games/${_player.gameId}/players/${_player.username}/properties/${property}/houses`, "POST").catch(errorHandler);
}

function sellHouse(property){
    fetchFromServer(`/games/${_player.gameId}/players/${_player.username}/properties/${property}/houses`, "DELETE").catch(errorHandler);
}

function buyHotel(property){
    fetchFromServer(`/games/${_player.gameId}/players/${_player.username}/properties/${property}/hotel`, "POST").catch(errorHandler);
}

function sellHotel(property){
    fetchFromServer(`/games/${_player.gameId}/players/${_player.username}/properties/${property}/hotel`, "DELETE").catch(errorHandler);
}


// ########################################### Mortgage #################################################
function takeMortgage(property){
    fetchFromServer(`/games/${_player.gameId}/players/${_player.username}/properties/${property}/mortgage`, "POST").catch(errorHandler);
}

function settleMortgage(property){
    fetchFromServer(`/games/${_player.gameId}/players/${_player.username}/properties/${property}/mortgage`, "DELETE").catch(errorHandler);
}


// ############################################# Prison #################################################
function payPrisonFine(){
    fetchFromServer(`/games/${_player.gameId}/prison/${_player.username}/fine`, "POST").catch(errorHandler);
}

function freeFromPrison(){
    fetchFromServer(`/games/${_player.gameId}/prison/${_player.username}/free`, "POST").catch(errorHandler);
}

// ############################################# Auctions #################################################
// TODO: GETTER
function retrieveBankAuctions(){
    return fetchFromServer(`/games/${_player.gameId}/bank/auctions`, "GET").catch(errorHandler);
}

// TODO: GETTER
function retrievePlayerAuctions(username){
    return fetchFromServer(`/games/${_player.gameId}/players/${username}/auctions`, "GET").catch(errorHandler);
}

function bidBankAuction(property, amount){
    const requestBody = {
        "bidder": _player.username,
        "amount": amount
    };

    fetchFromServer(`/games/${_player.gameId}/bank/auctions/${property}/bid`, 'POST', requestBody).catch(errorHandler);
}

function bidPlayerAuction(property, username, amount){
    const requestBody = {
        "bidder": _player.username,
        "amount": amount
    };

    fetchFromServer(`/games/${_player.gameId}/players/${username}/auctions/${property}/bid`, 'POST', requestBody).catch(errorHandler);
}

function startPlayerAuction(property, startBid, duration=30){
    const requestBody = {
        "start-bid": startBid,
        "duration": duration
    };

    fetchFromServer(`/games/${_player.gameId}/players/${_player.username}/auctions/${property}`, 'POST', requestBody).catch(errorHandler);
}


// ############################################# Trade #################################################
function trade(other, offerProperty, offerAmount, wantProperty){
    const requestBody = {
        "player": other,
        "offer": [
            offerProperty,
            offerAmount
        ],
        "return": [
            wantProperty
        ]
    };

    fetchFromServer(`/games/${_player.gameId}/players/${_player.username}/trades`, 'POST', requestBody).catch(errorHandler);
}
