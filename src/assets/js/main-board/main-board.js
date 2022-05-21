"use strict";

async function startGame() {
    await retrieveTiles();
    await retrieveGame();
}

async function reloadGame() {
    const prevGame = Object.assign({}, _game);

    await retrieveGame();

    checkGameState(prevGame);
    setGameState();
    rerender();

    enableOrDisableButtons();

    setTimeout(reloadGame, 1000);
}

function checkGameState(prevGame) {
    checkEndState();
    checkTurnState(prevGame);
    checkLogState();
}

function setGameState() {
    setDiceRollState();
    setBuyPropertyState();
    setBuyHouseState();
    setSellHouseState();
    setBuyHotelState();
    setSellHotelState();
    setTakeMortgageState();
    setSettleMortgageState();
    setPlayerAuctionState();
    setCollectRentState();
    setJailCardState();
    setPrisonFeeState();
}

function rerender() {
    renderCarousel();
    renderDiceRoll();
    processTileMap('#home-board', _player.username);
    renderPlayerBalance(_player.username);
    renderPlayerAtTurn();
    renderPlayerStatsButtons();
}

function enableOrDisableButtons() {
    document.querySelectorAll('.button:not(.active)').forEach($button => {
        $button.disabled = true;
    });
    document.querySelectorAll('.button.active').forEach($button => {
        $button.disabled = false;
    });
}


function playerAction(action) {
    const tile = retrieveTileOnCarousel();
    switch (action) {
        case "roll-dice":
            rollDice();
            break;
        case "buy-property":
            buyProperty(tile.name);
            break;
        case "dont-buy-property":
            dontBuyProperty(tile.name);
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
        case "settle-mortgage":
            settleMortgage(tile.name);
            break;
        case "setup-auction":
            const startBid = document.querySelector('#start-bid').value;
            startPlayerAuction(tile.name, startBid);
            break;
        case "collect-rent":
            const debtorName = _game['turns'].at(-1)['player'];
            const property = _game['turns'].at(-1)['moves'].at(-1)['tile'];
            collectRent(property, debtorName);
            _player.collectedRent = true;
            break;
        case "use-jail-card":
            getOutOfJailWithCard();
            break;
        case "pay-prison-fine":
            payFeeToGetOutOfJail();
            break;
        case "bankrupt":
            bankrupt();
            break;
        default:
            throw "Unknown action";
    }
}

function navigateMainBoard(navigation) {
    const tile = retrieveTileOnCarousel();
    switch (navigation) {
        case "home":
            addClassToElements("#main-board > section", 'hidden');
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
        case "settle-mortgage":
            renderSettleMortgage(tile);
            break;
        case "setup-auction":
            renderSetupAuction(tile);
            break;
        case "auction":
            throw "Auction is not implemented on server!";
        case "bankrupt":
            renderBankrupt();
            break;
        default:
            throw "Unknown navigation";
    }
}

function processPlayerStats(e) {
    e.preventDefault();
    const $target = e.target.closest('.player-stats-buttons > button');
    if (!$target) {
        return;
    }
    const player = retrievePlayer($target.dataset.player);
    renderPlayerStats(player);

}

function processPlayerStatsTileMap(e) {
    e.preventDefault();
    const $tile = e.target.closest('.tile-map div[data-tile]');
    if (!$tile) {
        return;
    }
    switch(retrieveTileByName($tile.dataset.tile).type){
        case "street":
            renderStreetInStats($tile);
            break;
        case "railroad":
            renderRailroadInStats($tile);
            break;
        case "utility":
            renderUtilityInStats($tile);
            break;
        default:
            throw "Invalid tile type";
    }
}
