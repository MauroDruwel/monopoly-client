"use strict";
let _token = null;

document.addEventListener('DOMContentLoaded',init);

function init(){
    if (document.querySelector('.join-game')){
        initLoginJoin();
    }
}

function initLoginJoin(){
    fetchGames(showGames);
    document.querySelector(".join-game button[type=submit]").addEventListener("click",joinAGame);
    document.querySelector(".join-game button[type=submit]").addEventListener("click",goToLink);
}
