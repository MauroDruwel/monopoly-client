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


function renderTakeMortgage(tile){
    switch (tile.type){
        case "street":
            renderTransactionPage(tile, '#take-mortgage-property',tile.mortgage);
            processProperty(tile.name);
            break;
        case "utility":
            renderTransactionPage(tile, '#take-mortgage-utility',tile.mortgage);
            processUtility(tile.name);
            break;
        case "railroad":
            renderTransactionPage(tile, '#take-mortgage-railroad',tile.mortgage);
            processRailroad(tile.name);
            break;
        default:
            throw "Invalid tile type";
    }
}

function renderSettleMortgage(tile){
    switch (tile.type){
        case "street":
            renderTransactionPage(tile, '#settle-mortgage-property', Math.floor(parseInt(tile.mortgage) * 1.1));
            processProperty(tile.name);
            break;
        case "utility":
            renderTransactionPage(tile, '#settle-mortgage-utility', Math.floor(parseInt(tile.mortgage) * 1.1));
            processUtility(tile.name);
            break;
        case "railroad":
            renderTransactionPage(tile, '#settle-mortgage-railroad', Math.floor(parseInt(tile.mortgage) * 1.1));
            processRailroad(tile.name);
            break;
        default:
            throw "Invalid tile type";
    }
}

function renderSetupAuction(tile){
    addClassToElements('#main-board > section', 'hidden');
    document.querySelector(`#setup-auction`).classList.remove('hidden');
    document.querySelector(`#setup-auction legend > span`).innerHTML = tile.name;
}

function renderPlayerBalance(namePlayer){
    const $container = document.querySelector(".player-balance");
    let balance = 0;
    _game.players.forEach(player => {
        if (player.name === namePlayer){
            balance = player.money;
        }
    });

    $container.innerHTML = balance;
}

function renderPlayerAtTurn(){
    document.querySelector(".top-left p span").innerHTML = _game.currentPlayer;
}

function renderPlayerStatsButtons(){
    const $template = document.querySelector(`#home-board .player-stat-button-template`).content.firstElementChild.cloneNode(true);
    document.querySelector('#home-board .player-stats-buttons').innerHTML ='';
    let html = '';
    _game['players'] .forEach(player => {
        $template.dataset.player = player['name'];
        $template.innerHTML = player['name'];
        html += $template.outerHTML;
    });
    document.querySelector('#home-board .player-stats-buttons').insertAdjacentHTML('beforeend', html);
}
function renderPlayerStats(player){
    addClassToElements('#main-board > section', 'hidden');
    document.querySelector(`#stats`).classList.remove('hidden');
}