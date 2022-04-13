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
    rerender();

    enableOrDisableButtons();

    // this does not reinitialize initMainBoard!
    setTimeout(reloadGame, 1000);
}

function checkGameState() {
    checkEndState();
    checkDiceRollState();
    // add check state here
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

function checkDiceRollState(){
    if(_game.currentPlayer === _player.username && _game.canRoll){
        document.querySelector('#roll-dice').classList.add('active');
    }
    else {
        document.querySelector('#roll-dice').classList.remove('active');
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


/* ---------------- event handlers ---------------- */

function processDiceRoll(e){
    e.preventDefault();
    rollDice();
}











/* --------------------------------------------------------------------------------------------------- */
/* ------------------------------------------ monopoly actions --------------------------------------- */
/* --------------------------------------------------------------------------------------------------- */


// ###################################### Turn Management ##############################################
function bankrupt() {
    fetchFromServer(`/games/${_player.gameId}/players/${_player.username}/bankruptcy`, "POST").catch(errorHandler);
}

function rollDice(){
    if(_game.currentPlayer === _player.username && _game.canRoll){
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
    fetchFromServer(`/games/${_player.gameId}/players/${_player.username}/properties/${property}`, "POST").catch(errorHandler);
}

function notBuyProperty(property){
    fetchFromServer(`/games/${_player.gameId}/players/${_player.username}/properties/${property}`, "DELETE").catch(errorHandler);
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
    fetchFromServer(`/games/${_player.gameId}/bank/auctions`, "GET").catch(errorHandler);
}

// TODO: GETTER
function retrievePlayerAuctions(username){
    fetchFromServer(`/games/${_player.gameId}/players/${username}/auctions`, "GET").catch(errorHandler);
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

function startPlayerAuction(property, startBid, duration){
    const requestBody = {
        "start-bid": startBid,
        "duration": duration
    };

    fetchFromServer(`/games/${_player.gameId}/players/${_player.username}/auctions/${property}/bid`, 'POST', requestBody).catch(errorHandler);
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
