"use strict";

function renderCarousel(){
    const scale = ["small", "medium", "", "medium", "small"];
    const numberOfTiles = scale.length;
    let pointer = _player.carousel + (Math.floor(numberOfTiles / 2));

    if(pointer >= _tiles.length){
        pointer -= _tiles.length ;
    }

    for(let counter = 0; counter < numberOfTiles; counter++){
        renderTile(_tiles.at(pointer));
        pointer -= 1; // index can be negative with array.at(i)
    }
}



/* const movies = json.Search;

movies.forEach(movie => {
    const $template = document.querySelector("#movies template").content.firstElementChild.cloneNode(true);

    $template.dataset.imdbid = movie.imdbID;
    $template.querySelector('img').setAttribute('src', movie.Poster);
    $template.querySelector('img').setAttribute('alt', movie.Title);
    $template.querySelector('img').setAttribute('title', movie.Title);
    $template.querySelector('figcaption').innerText = movie.Title;
    document.querySelector("#movies").insertAdjacentHTML('beforeend', $template.outerHTML);
}); */