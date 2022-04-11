"use strict";

function renderCarousel(json){
    const position = _player.carousel;


    const movies = json.Search;

    movies.forEach(movie => {
        const $template = document.querySelector("#movies template").content.firstElementChild.cloneNode(true);

        $template.dataset.imdbid = movie.imdbID;
        $template.querySelector('img').setAttribute('src', movie.Poster);
        $template.querySelector('img').setAttribute('alt', movie.Title);
        $template.querySelector('img').setAttribute('title', movie.Title);
        $template.querySelector('figcaption').innerText = movie.Title;
        document.querySelector("#movies").insertAdjacentHTML('beforeend', $template.outerHTML);
    })
}