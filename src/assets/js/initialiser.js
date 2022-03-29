"use strict";
let _token = null;

document.addEventListener('DOMContentLoaded',init);

function init(){
    if (document.querySelector('#join-create')){
        initJoinCreate();
        console.log("testttt");
    }
}

function initJoinCreate(){
    fetchGames(showGames);
    document.querySelector("#join-game button[type=submit]").addEventListener("click",joinAGame);
    document.querySelector("#join-game button[type=submit]").addEventListener("click",goToLink);
}
function goToLink(e){
    e.preventDefault();
    window.location.href = '../../index.html';
}