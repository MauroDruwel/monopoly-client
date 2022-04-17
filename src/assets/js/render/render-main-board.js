"use strict";

function renderDiceRoll(){
    if(_game["lastDiceRoll"]){
        document.querySelector('#dice-container .dice-right').innerHTML = _game["lastDiceRoll"][0];
        document.querySelector('#dice-container .dice-left').innerHTML = _game["lastDiceRoll"][1];
    }
}
function renderBuyProperty(tile){
    switch (tile.type){
        case "street":
            renderTransactionPage(tile, '#buy-property-property',  tile.cost);
            processProperty(tile.name);
            break;
        case "utility":
            renderTransactionPage(tile, '#buy-property-utility',  tile.cost);
            processUtility(tile.name);
            break;
        case "railroad":
            renderTransactionPage(tile, '#buy-property-railroad',  tile.cost);
            processRailroad(tile.name);
            break;
        default:
            throw "Invalid tile type";
    }
}

function renderBuyHouse(tile){
    renderTransactionPage(tile, '#buy-house',  tile.housePrice);
    processProperty(tile.name);
}

function renderSellHouse(tile){
    renderTransactionPage(tile, '#sell-house', parseInt(tile.housePrice) / 2);
    processProperty(tile.name);
}

function renderBuyHotel(tile){
    renderTransactionPage(tile, '#buy-hotel', tile.housePrice + " + 4 houses");
    processProperty(tile.name);
}

function renderSellHotel(tile){
    renderTransactionPage(tile, '#sell-hotel', "N/A");
    processProperty(tile.name);
}

function renderTransactionPage(tile, section, transactionValue){
    addClassToElements('#main-board > section', 'hidden');
    document.querySelector(`${section}`).classList.remove('hidden');
    document.querySelectorAll(`${section} .tile`).forEach($element => {
        $element.dataset.tile = tile.nameAsPathParameter;
    });
    document.querySelector(`${section} .information h2 span`).innerHTML = transactionValue;
}
