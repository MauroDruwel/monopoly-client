"use strict";

function renderCarousel(){
    const scale = ["small", "medium", "", "medium", "small"];
    const numberOfTiles = scale.length;
    let pointer = _player.carousel + (Math.floor(numberOfTiles / 2));

    if(pointer >= _tiles.length){
        pointer -= _tiles.length ;
    }

    for(let counter = 0; counter < numberOfTiles; counter++){
        renderTile(_tiles.at(pointer), scale[counter]);
        pointer -= 1; // index can be negative with array.at(i)
    }
}

function renderTile(tile, scale="") {
    switch(tile.type) {
        case "street":
            renderStreetTile(scale);
            break;
        case "utility":
            renderUtilityTile(scale);
            break;
        case "railroad":
            renderRailroadTile(scale);
            break;
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

function renderGoTile(scale=""){
    renderBasicTile(".go-template", scale);
}

function renderCommunityChestTile(scale=""){
    renderBasicTile(".community-chest-template", scale);
}

function renderChanceTile(scale=""){
    renderBasicTile(".chance-template", scale);
}

function renderJailTile(scale=""){
    renderBasicTile(".jail-template");
}

function renderGoToJailTile(scale=""){
    renderBasicTile(".go-to-jail-template");
}

function renderTaxIncomeTile(scale=""){
    renderBasicTile(".tax-income-template", scale);
}

function renderLuxuryTaxTile(scale=""){
    renderBasicTile(".luxury-tax-template", scale);
}

function renderFreeParkingTile(scale=""){
    renderBasicTile(".free-parking-template", scale);
}

function renderBasicTile(template, scale=""){
    const $template = document.querySelector(`#carousel ${template}`).content.firstElementChild.cloneNode(true);
    $template.classList.add(scale);
    document.querySelector('#carousel').insertAdjacentHTML('beforeend', $template.outerHTML);
}
