"use strict";

function navigateCarousel(e){
    e.preventDefault();
    const $target = e.target;
    const $navigation = $target.closest('#carousel-navigation > img');
    if(!$navigation) {
        return;
    }
    const direction = $navigation.id;
    processCarouselPosition(direction);
    renderCarousel();
}

function processCarouselPosition(direction){
    if(direction === 'left-arrow'){
        _player.carousel += 1;

        // reached last tile,then:
        if(_player.carousel === _tiles.length){
            _player.carousel = 0;
        }
    }
    else if(direction === 'right-arrow'){
        _player.carousel -= 1;

        // reached first tile,then:
        if(_player.carousel < 0 ){
            _player.carousel =  _tiles.length - 1;
        }
    }
    else  if(direction === 'return-home'){
        const currentTile = retrievePlayer(_player.username).currentTile;
        _player.carousel = retrieveTilePosition(currentTile);
    }
    saveToStorage("_player", _player);
}
