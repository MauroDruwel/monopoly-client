/* ---------------- set game state ------------------- */
/* ---------------- part of main-board.js ------------------- */


function setDiceRollState(){
    if(isItMyTurn() && _game.canRoll){
        document.querySelector('[data-action="roll-dice"]').classList.add('active');
    }
    else {
        document.querySelector('[data-action="roll-dice"]').classList.remove('active');
    }
}

function setBuyPropertyState(){
    const attributeBuy = '[data-navigate="buy-property"]';
    const attributeDontBuy = '[data-action="dont-buy-property"]';

    if(isItMyTurn() && isDirectSaleTileOnCarousel() && _game.directSale != null){
        const tile = retrieveTileByName( _game.directSale);
        if(retrieveMyBalance() >= tile.cost){
            document.querySelector(attributeBuy).classList.add('active');
        }
        else {
            document.querySelector(attributeBuy).classList.remove('active');
        }
        document.querySelector(attributeDontBuy).classList.add('active');
    }
    else {
        document.querySelector(attributeBuy).classList.remove('active');
        document.querySelector(attributeDontBuy).classList.remove('active');
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

function setSettleMortgageState(){
    const tile = retrieveTileOnCarousel();
    if (canSettleMortgage(tile)) {
        document.querySelector('[data-navigate="settle-mortgage"]').classList.add('active');
    } else {
        document.querySelector('[data-navigate="settle-mortgage"]').classList.remove('active');
    }
}

function setPlayerAuctionState(){
    const tile = retrieveTileOnCarousel();
    if (canBeAuctioned(tile)) {
        document.querySelector('[data-navigate="setup-auction"]').classList.add('active');
    } else {
        document.querySelector('[data-navigate="setup-auction"]').classList.remove('active');
    }
}

function setCollectRentState(){
    if(canCollectRent()){
        document.querySelector('[data-action="collect-rent"]').classList.add('active');
    }
    else{
        document.querySelector('[data-action="collect-rent"]').classList.remove('active');
    }
}

function setJailCardState(){
    document.querySelector('#amount-jail-cards-player').innerHTML = `${retrieveMyAmountOfJailCards()}`;
    if(canIUseAJailCard()){
        document.querySelector('[data-action="use-jail-card"]').classList.add('active');
    }
    else{
        document.querySelector('[data-action="use-jail-card"]').classList.remove('active');
    }
}

function setPrisonFeeState(){
    if(canIPayForPrisonFee()){
        document.querySelector('[data-action="pay-prison-fine"]').classList.add('active');
    }
    else{
        document.querySelector('[data-action="pay-prison-fine"]').classList.remove('active');
    }
}
