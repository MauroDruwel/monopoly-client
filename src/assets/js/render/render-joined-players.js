"use strict";
function showJoinedPlayers(response){
    const $ul = document.querySelector("ul");
    $ul.innerHTML = "";
    for (let i = 0; i < response.players.length; i++) {
        $ul.insertAdjacentHTML("beforeend",`<li>${response.players[i].name}</li>`);

    }
    for (let i = 0; i < response.numberOfPlayers - response.players.length; i++) {
        $ul.insertAdjacentHTML("beforeend","<li>Waiting for player...</li>");
    }

}
