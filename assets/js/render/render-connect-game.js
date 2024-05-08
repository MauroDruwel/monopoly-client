"use strict";

function renderGames(games) {
    document.querySelector('#available-games').classList.remove('hidden');
    const $template = document.querySelector('#radio-list');
    const $tr = $template.content.firstElementChild.cloneNode(true);

    const $tbody = document.querySelector('#available-games tbody');
    $tbody.innerHTML = $template.outerHTML;
    games.forEach(game => {
        if (game.started === false) {

            $tr.querySelector('td:nth-child(1)').setAttribute("for", game.id);
            $tr.querySelector('td:nth-child(1)').innerHTML = beautifyId(game.id);
            $tr.querySelector('td:nth-child(2)').setAttribute("for", game.id);
            $tr.querySelector('td:nth-child(2)').innerHTML = game.numberOfPlayers;
            const $trInput = $tr.querySelector('td:last-of-type input');
            $trInput.setAttribute('id', game.id);
            $trInput.setAttribute('name', 'Games');
            $trInput.setAttribute('value', game.id);

            $tbody.insertAdjacentHTML("beforeend", $tr.outerHTML);
        }
    });
}

function hideGames() {
    document.querySelector('#available-games').classList.add('hidden');

    const $template = document.querySelector('#radio-list');
    const $tbody = document.querySelector('#available-games tbody');
    $tbody.innerHTML = $template.outerHTML;
}
