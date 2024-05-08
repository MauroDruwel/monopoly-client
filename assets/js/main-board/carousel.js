"use strict";

function navigateCarousel(e){
    e.preventDefault();
    const $target = e.target;
    const $navigation = $target.closest('#carousel-navigation > img');
    if(!$navigation) {
        return;
    }
    const direction = $navigation.id;
    processCarouselDirection(direction);
    renderCarousel();
}

function processCarouselDirection(direction){
    if(direction === 'left-arrow'){
        processCarouselMove(1);
    }
    else if(direction === 'right-arrow'){
        processCarouselMove(-1);
    }
    else  if(direction === 'return-home'){
        const currentTile = retrievePlayer(_player.username).currentTile;
        _player.carousel = retrieveTilePosition(currentTile);
    }
    saveToStorage("_player", _player);
}

function processCarouselMove(positions){
    _player.carousel += positions;

    if(_player.carousel >= _tiles.length){
        _player.carousel = _player.carousel - _tiles.length;
    }
    else if(_player.carousel < 0 ){
        _player.carousel =  _player.carousel + _tiles.length;
    }
}

function processPropertySide(e){
    e.preventDefault();
    const $target = e.target;
    const $property = $target.closest('#carousel .property-front, #carousel .property-back');
    if(!$property) {
        return;
    }
    if($property.classList.contains('property-front')){
        document.querySelector("#carousel").classList.add("show-properties-back");
    }
    else if ($property.classList.contains("property-back")){
        document.querySelector("#carousel").classList.remove("show-properties-back");
    }
}
