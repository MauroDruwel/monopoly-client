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
            document.querySelector('[data-action="buy-property"]').classList.add('active');
        }
        else {
            document.querySelector('[data-action="buy-property"]').classList.remove('active');
        }
        document.querySelector('[data-action="dont-buy-property"]').classList.add('active');
    }
    else {
        document.querySelector('[data-action="buy-property"]').classList.remove('active');
        document.querySelector('[data-action="dont-buy-property"]').classList.remove('active');
    }
}

function setBuyHouseState(){
    const tile = retrieveTileOnCarousel();
    if(doIOwnTheStreet(tile.name) && canBuyHouse(tile.name) &&
        (retrieveMyBalance() >= retrieveTileByName(retrieveMyCurrentTileName()).housePrice)){
        document.querySelector('[data-navigate="buy-house"]').classList.add('active');
    }
    else {
        document.querySelector('[data-navigate="buy-house"]').classList.remove('active');
    }
}

function setSellHouseState(){
    const tile = retrieveTileOnCarousel();
    if(doIOwnTheStreet(tile.name) && canSellHouse(tile.name)){
        document.querySelector('[data-navigate="sell-house"]').classList.add('active');
    }
    else {
        document.querySelector('[data-navigate="sell-house"]').classList.remove('active');
    }
}

function setBuyHotelState(){
    const tile = retrieveTileOnCarousel();
    if(doIOwnTheStreet(tile.name) && canBuyHotel(tile.name)){
        document.querySelector('[data-navigate="buy-hotel"]').classList.add('active');
    }
    else {
        document.querySelector('[data-navigate="buy-hotel"]').classList.remove('active');
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

function retrieveStreetByPropertyFromGame(propertyName){
    const properties = retrievePlayer(_player.username).properties;
    const streetFromTiles = retrieveStreetByPropertyFromTiles(propertyName);
    const streetFromGame = [];
    if(Object.keys(streetFromTiles).length >= 1 && doIOwnTheStreet(propertyName)){
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
function canBuyHouse(propertyName){
    let property;
    const street = retrieveStreetByPropertyFromGame(propertyName);
    for(const propertyOfStreet of street){
        if(propertyOfStreet.property === propertyName){
            property = propertyOfStreet;
        }
    }
    for(const propertyOfStreet of street){
        // check if there is a property in the street "that is running behind" on house improvement
        if(propertyOfStreet.houseCount < property.houseCount || property.houseCount > 4 ||
            propertyOfStreet.hotelCount !== property.hotelCount){
            return false;
        }
    }
    return true;
}

// check if street is improved evenly with hotels...
function canBuyHotel(propertyName){
    let property;
    const street = retrieveStreetByPropertyFromGame(propertyName);
    for(const propertyOfStreet of street){
        if(propertyOfStreet.property === propertyName){
            property = propertyOfStreet;
        }
    }
    for(const propertyOfStreet of street){
        // check if there is a property in the street "that is running behind" on hotel improvement
        if(propertyOfStreet.hotelCount < property.hotelCount || property.houseCount < 4 ||
            (propertyOfStreet.houseCount < 4 && propertyOfStreet.hotelCount === 0)){
            return false;
        }
    }
    return true;
}

// check if street is selled evenly...
function canSellHouse(propertyName){
    let property;
    const street = retrieveStreetByPropertyFromGame(propertyName);
    for(const propertyOfStreet of street){
        if(propertyOfStreet.property === propertyName){
            property = propertyOfStreet;
        }
    }
    for(const propertyOfStreet of street){
        // check if there is a property in the street that has more houses than current property
        if(propertyOfStreet.houseCount > property.houseCount || property.houseCount <= 0 ||
            propertyOfStreet.hotelCount !== property.hotelCount){
            return false;
        }
    }
    return true;
}

function doIOwnTheStreet(property){
    const street = retrieveStreetByPropertyFromTiles(property);
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
            buyProperty(retrieveMyCurrentTileName());
            break;
        case "dont-buy-property":
            dontBuyProperty(retrieveMyCurrentTileName());
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
        case "buy-house":
            // make buy house page visible
            renderBuyHouse(tile);
            break;
        case "sell-house":
            // make sell house page visible
            renderSellHouse(tile);
            break;
        case "buy-hotel":
            // make buy hotel page visible
            renderBuyHotel(tile);
            break;
        case "sell-hotel":
            // make sell hotel page visible
            break;
        case "setup-auction":
            // make setup auction visible
            break;
        case "auction":
            // make auction visible
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
