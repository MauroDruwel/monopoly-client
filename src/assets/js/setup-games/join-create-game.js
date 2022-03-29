"use strict";
function getJoinId(){
    return document.querySelector('input:checked').value;
}
function getUsername(){
    return document.querySelector("#username").value;
}
function joinAGame(e){
    e.preventDefault();
    const requestBody = {"playerName": `${getUsername()}`}
    const path = `/games/${getJoinId()}/players`;
    fetchFromServer(path,'POST', requestBody).catch(errorHandler);
}
