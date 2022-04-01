"use strict";
function renderQueue(game){

    const $ul = document.querySelector("#queue ul");
    let html = '';
    $ul.innerHTML = html;

    game.players.forEach(player =>{
        html += `<li>${player.name}</li>`;
    });

    for (let i = 0; i < game.numberOfPlayers - game.players.length; i++) {
        html += "<li>Waiting for player...</li>";
    }

    $ul.insertAdjacentHTML("beforeend", html);

}
