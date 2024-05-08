"use strict";

const carouselTilesContainerSelector = "#carousel > div:last-of-type";

function renderCarousel(){
    const scale = ["small", "medium", "normal", "medium", "small"];
    const numberOfTiles = scale.length;
    let pointer = _player.carousel + (Math.floor(numberOfTiles / 2));
    if(pointer >= _tiles.length){
        pointer -= _tiles.length ;
    }

    document.querySelector(`${carouselTilesContainerSelector}`).innerHTML = '';

    for(let counter = 0; counter < numberOfTiles; counter++){
        renderTile(_tiles.at(pointer), scale[counter]);
        pointer -= 1;
    }
    renderPlayerPositionOnCarousel();
}

function renderTile(tile, scale) {
    switch(tile.type) {
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

        case "Go":
            renderBasicTile(".go-template", scale);
            break;
        case "community chest":
            renderBasicTile(".community-chest-template", scale);
            break;
        case "Tax Income":
            renderBasicTile(".tax-income-template", scale);
            break;
        case "chance":
            renderBasicTile(".chance-template", scale);
            break;
        case "Jail":
            renderBasicTile(".jail-template", scale);
            break;
        case "Free Parking":
            renderBasicTile(".free-parking-template", scale);
            break;
        case "Go to Jail":
            renderBasicTile(".go-to-jail-template", scale);
            break;
        case "Luxury Tax":
            renderBasicTile(".luxury-tax-template", scale);
            break;
        default:
            throw "Couldn't render tile";
    }
}

function renderBasicTile(template, scale){
    const $template = document.querySelector(`#carousel ${template}`).content.firstElementChild.cloneNode(true);
    $template.classList.add(scale);
    document.querySelector(`${carouselTilesContainerSelector}`).insertAdjacentHTML('beforeend', $template.outerHTML);
}

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
