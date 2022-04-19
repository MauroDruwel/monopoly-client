"use strict";

function renderTileMap(section, player){
    const tileMaps = document.querySelectorAll(`${section} .tile-map`);

    tileMaps.forEach(tileMap => {
        tileMap.querySelectorAll('div[data-tile]').forEach(tile => {
            player.properties.forEach(property => {
                if(tile.dataset.tile === convertSpacesToUnderscores(property.property)){
                    tile.classList.add('owns');
                }
            });
        });
        tileMap.querySelector('.player span').innerHTML = player.name;
    });
}
