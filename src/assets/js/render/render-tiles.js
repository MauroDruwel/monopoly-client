"use strict";

function renderTile(tile, scale="") {
    switch(tile.type) {
        case "Go":
            renderGoTile(scale);
            break;
        case "street":
            renderStreetTile(scale);
            break;
        case "community chest":
            renderCommunityChestTile(scale);
            break;
        case "Tax Income":
            renderTaxIncomeTile(scale);
            break;
        case "railroad":
            renderRailroadTile(scale);
            break;
        case "chance":
            renderChanceTile(scale);
            break;
        case "Jail":
            renderJailTile(scale);
            break;
        case "utility":
            renderUtilityTile(scale);
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
    renderBasicTile("");
}

function renderTaxIncomeTile(scale=""){
    // TODO: change to actual tile
    renderBasicTile(".community-chest-template", scale);
}

function renderBasicTile(template, scale=""){
    const $template = document.querySelector(`#carousel ${template}`).content.firstElementChild.cloneNode(true);
    $template.classList.add(scale);
    document.querySelector('#carousel').insertAdjacentHTML('beforeend', $template.outerHTML);
}