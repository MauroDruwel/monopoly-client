"use strict";
function showJoinedPlayers(response){
    const $ul = document.querySelector("ul");
    $ul.innerHTML = "";
    response.players.forEach(player =>{
        $ul.insertAdjacentHTML("beforeend",`<li>${player.name}</li>`);
    });
    for (let i = 0; i < response.numberOfPlayers - response.players.length; i++) {
        $ul.insertAdjacentHTML("beforeend","<li>Waiting for player...</li>");
    }
}
