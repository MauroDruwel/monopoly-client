"use strict";
function showGames(games){
    const $template = document.querySelector('#radio-list').content.firstElementChild.cloneNode(true);
    games.forEach(game => {
        if (game.started === false){
            // game name
            $template.querySelector('td:nth-child(1)').setAttribute("for",game.id);
            $template.querySelector('td:nth-child(1)').innerHTML=refactorGameID(game.id);
            // players
            $template.querySelector('td:nth-child(2)').setAttribute("for",game.id);
            $template.querySelector('td:nth-child(2)').innerHTML=game.numberOfPlayers;
            // radio
            $template.querySelector('td:last-of-type input').setAttribute('id',game.id);
            $template.querySelector('td:last-of-type input').setAttribute('name','Games');
            $template.querySelector('td:last-of-type input').setAttribute('value',game.id);
            document.querySelector('tbody').insertAdjacentHTML("beforeend",$template.outerHTML);
        }
    });
}
function showJoinedPlayers(response){
    console.log(response);
    const $ul = document.querySelector("ul");
    $ul.innerHTML = "";
    for (let i = 0; i < response.players.length; i++) {
        $ul.insertAdjacentHTML("beforeend",`<li>${response.players[i].name}</li>`);

    }
    for (let i = 0; i < response.numberOfPlayers - response.players.length; i++) {
        $ul.insertAdjacentHTML("beforeend","<li>Waiting for player...</li>");
    }

}
