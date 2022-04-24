"use strict";

const carouselTilesContainerSelector = "#carousel > div:last-of-type";

function renderCarousel(){
    const scale = ["small", "medium", "normal", "medium", "small"];
    const numberOfTiles = scale.length;
    let pointer = _player.carousel + (Math.floor(numberOfTiles / 2));
    if(pointer >= _tiles.length){
        pointer -= _tiles.length ;
    }

    // reset carousel
    document.querySelector(`${carouselTilesContainerSelector}`).innerHTML = '';

    for(let counter = 0; counter < numberOfTiles; counter++){
        renderTile(_tiles.at(pointer), scale[counter]);
        pointer -= 1; // index can be negative with array.at(i)
    }
    renderPlayerPositionOnCarousel();
}

function renderTile(tile, scale) {
    switch(tile.type) {
        /* tiles that a player can actually own */
        case "street":
            if(document.querySelector("#carousel").classList.contains("show-properties-back")){
                renderBackOfStreetTile(tile, scale);
            }
            else {
                renderFrontOfStreetTile(tile, scale);
            }
            break;
        case "utility":
            renderUtilityTile(tile, scale);
            break;
        case "railroad":
            renderRailroadTile(tile, scale);
            break;

        /* basic tile */
        case "Go":
            renderGoTile(scale);
            break;
        case "community chest":
            renderCommunityChestTile(scale);
            break;
        case "Tax Income":
            renderTaxIncomeTile(scale);
            break;
        case "chance":
            renderChanceTile(scale);
            break;
        case "Jail":
            renderJailTile(scale);
            break;
        case "Free Parking":
            renderFreeParkingTile(scale);
            break;
        case "Go to Jail":
            renderGoToJailTile(scale);
            break;
        case "Luxury Tax":
            renderLuxuryTaxTile(scale);
            break;
        default:
            throw "Couldn't render tile";
    }
}

/* Basic Tiles */

function renderGoTile(scale){
    renderBasicTile(".go-template", scale);
}

function renderCommunityChestTile(scale){
    renderBasicTile(".community-chest-template", scale);
}

function renderChanceTile(scale){
    renderBasicTile(".chance-template", scale);
}

function renderJailTile(scale){
    renderBasicTile(".jail-template", scale);
}

function renderGoToJailTile(scale){
    renderBasicTile(".go-to-jail-template", scale);
}

function renderTaxIncomeTile(scale){
    renderBasicTile(".tax-income-template", scale);
}

function renderLuxuryTaxTile(scale){
    renderBasicTile(".luxury-tax-template", scale);
}

function renderFreeParkingTile(scale){
    renderBasicTile(".free-parking-template", scale);
}

function renderBasicTile(template, scale){
    const $template = document.querySelector(`#carousel ${template}`).content.firstElementChild.cloneNode(true);
    $template.classList.add(scale);
    document.querySelector(`${carouselTilesContainerSelector}`).insertAdjacentHTML('beforeend', $template.outerHTML);
}

/* tiles that a player can actually own */

function renderFrontOfStreetTile(tile, scale){
    const $template = document.querySelector(`#carousel .property-front-template`).content.firstElementChild.cloneNode(true);
    $template.classList.add(scale);
    $template.dataset.tile = tile.nameAsPathParameter;
    document.querySelector(`${carouselTilesContainerSelector}`).insertAdjacentHTML('beforeend', $template.outerHTML);
    processPropertyFront(tile.name);
}

function renderBackOfStreetTile(tile, scale){
    const $template = document.querySelector(`#carousel .property-back-template`).content.firstElementChild.cloneNode(true);
    $template.classList.add(scale);
    $template.dataset.tile = tile.nameAsPathParameter;
    document.querySelector('#carousel > div:last-of-type').insertAdjacentHTML('beforeend', $template.outerHTML);
    processPropertyBack(tile.name);
}

function renderUtilityTile(tile, scale){
    const $template = document.querySelector(`#carousel .utility-template`).content.firstElementChild.cloneNode(true);
    $template.classList.add(scale);
    $template.dataset.tile = tile.nameAsPathParameter;
    document.querySelector(`${carouselTilesContainerSelector}`).insertAdjacentHTML('beforeend', $template.outerHTML);
    processUtility(tile.name);
}

function renderRailroadTile(tile, scale){
    const $template = document.querySelector(`#carousel .railroad-template`).content.firstElementChild.cloneNode(true);
    $template.classList.add(scale);
    $template.dataset.tile = tile.nameAsPathParameter;
    document.querySelector(`${carouselTilesContainerSelector}`).insertAdjacentHTML('beforeend', $template.outerHTML);
    processRailroad(tile.name);
}

/* render player position */

function renderPlayerPositionOnCarousel() {
    const $playerPosition = document.querySelector('#home-board .mid section .player-position');
    $playerPosition.innerHTML = '&#8205;';
    const playersOnTile = retrievePlayersOnTile(_tiles[_player.carousel].name);
    if (playersOnTile.length > 0) {
        let text = playersOnTile[0].name;
        if (playersOnTile.length > 1) {
            for (let i = 1; i < playersOnTile.length; i++) {
                text = `${text} & ${playersOnTile[i].name}`;
            }
        }
        $playerPosition.innerHTML = text;
    }
}
