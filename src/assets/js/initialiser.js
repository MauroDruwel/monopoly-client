"use strict";
let _token = null;

document.addEventListener('DOMContentLoaded',init);

function init(){
    if (document.querySelector('#join-create')){
        initJoinCreate();
    }
    else if (document.querySelector('#index')){
        initIndex();
    }
    else if (document.querySelector('#auction')){
        initAuction();
    }
}

function initJoinCreate(){
    fetchGames(showGames);
    document.querySelector("#join-game button[type=submit]").addEventListener("click",joinAGame);
    document.querySelector("#create-game button[type=submit]").addEventListener('click',createGame);
}
function initIndex(){
    document.querySelector("#start-game").addEventListener('click',goToJoinCreate);
}
function initAuction(){
    document.querySelector('#offerPlaceholder button[type=submit]').addEventListener('click', bid);
}
