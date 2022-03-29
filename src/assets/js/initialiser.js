"use strict";
let _token = null;

document.addEventListener('DOMContentLoaded',init);

function init(){
    if (document.querySelector('#join-create')){
        initLoginJoin();
    }
}

function initLoginJoin(){
    fetchGames(showGames);
}
