"use strict";

async function startGame() {
    await retrieveTiles(); // fetch board tiles
    await retrieveGame(); // fetch game data
}

async function reloadGame() {
    // remember previous game state
    const prevGame = Object.assign({}, _game);

    // fetch game data here:
    await retrieveGame();

    checkGameState(prevGame);
    setGameState();
    rerender();

    enableOrDisableButtons();

    // this does not reinitialize initMainBoard!
    setTimeout(reloadGame, 1000);
}

function checkGameState(prevGame) {
    checkEndState();
    checkTurnState(prevGame);
    checkAuctionState();
    checkLogState();
    // add check state here
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
    // add set state here
}

function rerender() {
    renderCarousel();
    renderDiceRoll();
    processTileMap('#home-board', _player.username);
    renderPlayerBalance(_player.username);
    renderPlayerAtTurn();
    renderPlayerStatsButtons();
    // add component you would like to reload here
}

function enableOrDisableButtons() {
    // disable buttons that don't contain .active class
    document.querySelectorAll('.button:not(.active)').forEach($button => {
        $button.disabled = true;
    });
    // enable buttons that do contain .active class
    document.querySelectorAll('.button.active').forEach($button => {
        $button.disabled = false;
    });
}

/* ---------------- event handlers ---------------- */

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
        case "settle-mortgage":
            settleMortgage(tile.name);
            break;
        case "setup-auction":
            const startBid = document.querySelector('#start-bid').value;
            startPlayerAuction(tile.name, startBid);
            break;
        case "collect-rent":
            const debtorName = _game['turns'].at(-1)['player']; // most recent player who moved
            const property = _game['turns'].at(-1)['moves'].at(-1)['tile']; // most recent tile from moves
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
            // make home board visible
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
            // render auction
            break;
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
