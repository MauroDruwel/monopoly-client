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
            if(tile.dataset.tile === _tiles[_player.carousel].nameAsPathParameter){
                removeClassFromElements(".tile-map div[data-tile]", "carousel-position-tile-map");
                tile.classList.add("carousel-position-tile-map");
            }
        });
        tileMap.querySelector('.player span').innerHTML = player.name;
    });
}
