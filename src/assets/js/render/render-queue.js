"use strict";
function renderQueue(response){
    if (!response.started){
        const $ul = document.querySelector("#queue ul");
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
        location.href = "select-pawn.html";
    }
}
