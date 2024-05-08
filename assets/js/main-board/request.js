
function bankrupt() {
    fetchFromServer(`/games/${_player.gameId}/players/${_player.username}/bankruptcy`, "POST").catch(errorHandler);
}

function rollDice(){
    if(isItMyTurn() && _game.canRoll){
        fetchFromServer(`/games/${_player.gameId}/players/${_player.username}/dice`, "POST").catch(errorHandler);
    }
}


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


function takeMortgage(property){
    fetchFromServer(`/games/${_player.gameId}/players/${_player.username}/properties/${property}/mortgage`, "POST").catch(errorHandler);
}

function settleMortgage(property){
    fetchFromServer(`/games/${_player.gameId}/players/${_player.username}/properties/${property}/mortgage`, "DELETE").catch(errorHandler);
}


function payFeeToGetOutOfJail(){
    fetchFromServer(`/games/${_player.gameId}/prison/${_player.username}/fine`, "POST").catch(errorHandler);
}

function getOutOfJailWithCard(){
    fetchFromServer(`/games/${_player.gameId}/prison/${_player.username}/free`,"POST").catch(errorHandler);
}

function retrieveBankAuctions(){
    return fetchFromServer(`/games/${_player.gameId}/bank/auctions`, "GET").catch(errorHandler);
}

function retrievePlayerAuctions(username){
    return fetchFromServer(`/games/${_player.gameId}/players/${username}/auctions`, "GET").catch(errorHandler);
}

function startPlayerAuction(property, startBid, duration=40.0){
    const requestBody = {
        "start-bid": parseInt(startBid),
        "duration": duration
    };
    console.log(requestBody);
    fetchFromServer(`/games/${_player.gameId}/players/${_player.username}/auctions/${property}`, 'POST', requestBody).catch(errorHandler);
}

function collectRent(property, debtorName){
    fetchFromServer(`/games/${_player.gameId}/players/${_player.username}/properties/${property}/visitors/${debtorName}/rent`, "DELETE").catch(errorHandler);
}
