"use strict";

function renderDiceRoll(){
    if(_game["lastDiceRoll"]){
        document.querySelector('#dice-container .dice-right').innerHTML = _game["lastDiceRoll"][0];
        document.querySelector('#dice-container .dice-left').innerHTML = _game["lastDiceRoll"][1];
    }
}

function renderBuyHouse(tile){
    addClassToElements('#main-board > section', 'hidden');
    document.querySelector('#buy-house').classList.remove('hidden');
    document.querySelectorAll('#buy-house .tile').forEach($element => {
        $element.dataset.tile = tile.nameAsPathParameter;
    });
    processProperty(tile.name);
    document.querySelector('#buy-house .information h2 span').innerHTML = tile.housePrice;
}

function renderSellHouse(tile){
    addClassToElements('#main-board > section', 'hidden');
    document.querySelector('#sell-house').classList.remove('hidden');
    document.querySelectorAll('#sell-house .tile').forEach($element => {
        $element.dataset.tile = tile.nameAsPathParameter;
    });
    processProperty(tile.name);
    document.querySelector('#sell-house .information h2 span').innerHTML = tile.housePrice;
}
