"use strict";

function showGames(games){
    const $template = document.querySelector('#radio-list').content.firstElementChild.cloneNode(true);
    games.forEach(game => {
        if (game.started === false){
            $template.querySelector('label').setAttribute("for",game.id);
            $template.querySelector('label:last-of-type').setAttribute("for",game.id);
            $template.querySelector('label').innerHTML=refactorGameID(game.id);
            $template.querySelector('label:last-of-type').innerHTML=game.numberOfPlayers;
            $template.querySelector('input').setAttribute('id',game.id);
            $template.querySelector('input').setAttribute('name','Games');
            $template.querySelector('input').setAttribute('value',game.id);
            document.querySelector('ul').insertAdjacentHTML("afterend",$template.outerHTML);
        }
    });
}
