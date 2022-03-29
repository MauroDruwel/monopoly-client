"use strict";
let _token = null;

document.addEventListener('DOMContentLoaded',init);

function init(){
    if (document.querySelector('#join-create')){
        initJoinCreate();
    }
}

function initJoinCreate(){
    fetchGames(showGames);
    document.querySelector("#join-game button[type=submit]").addEventListener("click",joinAGame);
    document.querySelector("#create-game button[type=submit]").addEventListener('click',createGame);

}
