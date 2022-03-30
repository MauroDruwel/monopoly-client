"use strict";

function renderGames(games){
    document.querySelector('#available-games').classList.remove('hidden');
    const $template = document.querySelector('#radio-list');
    const $tr = $template.content.firstElementChild.cloneNode(true);

    const $tbody = document.querySelector('tbody');
    $tbody.innerHTML = $template.outerHTML; // reset html

    games.forEach(game => {
        if (game.started === false){

            // game name
            $tr.querySelector('td:nth-child(1)').setAttribute("for",game.id);
            $tr.querySelector('td:nth-child(1)').innerHTML=beautifyId(game.id);
            // players
            $tr.querySelector('td:nth-child(2)').setAttribute("for",game.id);
            $tr.querySelector('td:nth-child(2)').innerHTML=game.numberOfPlayers;
            // radio
            $tr.querySelector('td:last-of-type input').setAttribute('id',game.id);
            $tr.querySelector('td:last-of-type input').setAttribute('name','Games');
            $tr.querySelector('td:last-of-type input').setAttribute('value',game.id);

            $tbody.insertAdjacentHTML("beforeend",$tr.outerHTML);
        }
    });
}

