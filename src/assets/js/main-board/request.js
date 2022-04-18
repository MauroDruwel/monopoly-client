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
function retrieveBankAuctions(){
    return fetchFromServer(`/games/${_player.gameId}/bank/auctions`, "GET").catch(errorHandler);
}

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

function startPlayerAuction(property, startBid, duration=40.0){
    const requestBody = {
        "start-bid": parseInt(startBid),
        "duration": duration
    };
    console.log(requestBody);
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

// ############################################# Player Interaction #################################################

function collectDebt(property, debtorName){
    fetchFromServer(`/games/${_player.gameId}/players/${_player.username}/properties/${property}/visitors/${debtorName}/rent`, "DELETE").catch(errorHandler);
}
