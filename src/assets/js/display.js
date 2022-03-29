"use strict";

function showGames(games){
    const $template = document.querySelector('#radio-list').content.firstElementChild.cloneNode(true);
    console.log($template);
    games.forEach(game => {
        if (game.started === false){
            $template.querySelector('td').setAttribute("for",game.id);
            $template.querySelector('td:nth-child(2)').setAttribute("for",game.id);
            $template.querySelector('td').innerHTML=refactorGameID(game.id);
            $template.querySelector('td:nth-child(2)').innerHTML=game.numberOfPlayers;
            $template.querySelector('td:last-of-type input').setAttribute('id',game.id);
            $template.querySelector('td:last-of-type input').setAttribute('name','Games');
            $template.querySelector('td:last-of-type input').setAttribute('value',game.id);
            document.querySelector('tbody').insertAdjacentHTML("afterend",$template.outerHTML);
        }
    });
}
