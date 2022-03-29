"use strict";
function getJoinId(){
    return document.querySelector('input[type=radio]:checked').value;
}
function getUsername(){
    return document.querySelector("#username-form input").value;
}
function joinAGame(e){
    e.preventDefault();
    const requestBody = {"playerName": `${getUsername()}`}
    const path = `/games/${getJoinId()}/players`;
    fetchFromServer(path,'POST', requestBody).catch(errorHandler);
}
function creatGame(e){
    e.preventDefault();
}