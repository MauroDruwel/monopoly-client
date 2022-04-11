"use strict";

function navigateCarousel(e){
    e.preventDefault();
    const $target = e.target;
    const $navigation = $target.closest('#carousel-navigation > img');
    if(!$navigation) {
        return;
    }
    console.log($navigation);
}
