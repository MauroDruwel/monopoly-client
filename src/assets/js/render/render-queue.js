"use strict";
function renderQueue(response){
    if (!response.started){
        const $ul = document.querySelector("#waiting-form ul");
        let html = '';
        $ul.innerHTML = html;

        response.players.forEach(player =>{
            html += `<li>${player.name}</li>`;
        });
        for (let i = 0; i < response.numberOfPlayers - response.players.length; i++) {
            html += "<li>Waiting for player...</li>";
        }
        $ul.insertAdjacentHTML("beforeend", html);
    }
    else {
        document.querySelector("#waiting-form").classList.add("hidden");
        document.querySelector("#select-pawn").classList.remove("hidden");
    }
}
