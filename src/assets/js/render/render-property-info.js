"use strict";

function renderTiles(){
    document.querySelector('#tile').classList.remove('hidden');
    const $template = document.querySelector('#frond-card');
    const $tr = $template.content.firstElementChild.cloneNode(true);

    const $tbody = document.querySelector('#frond-card-container');
    $tbody.innerHTML = $template.outerHTML; // reset html


}