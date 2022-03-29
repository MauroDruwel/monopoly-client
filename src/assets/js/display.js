"use strict";

function showGames(games){
    games.forEach(game => {
        if (game.started === false){
            const $template = document.querySelector('#radio-list').content.firstElementChild.cloneNode(true);
            $template.querySelectorAll('label').forEach(label =>
            {
                label.setAttribute('for',game.id);
            });
            $template.querySelector('label').innerHTML=refactorGameID(game.id);
            $template.querySelector('label:last-of-type').innerHTML=game.numberOfPlayers;
            $template.querySelector('input').setAttribute('id',game.id);
            $template.querySelector('input').setAttribute('name','Games');
            $template.querySelector('input').setAttribute('value',game.id);
            document.querySelector('#radio-list div').insertAdjacentHTML("beforeend",$template.outerHTML);
        }
    });
}
