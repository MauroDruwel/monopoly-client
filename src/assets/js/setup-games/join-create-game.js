"use strict";
function getJoinId(){
    return document.querySelector('input[type=radio]:checked').value;
}
function getUserName(){
    return document.querySelector("#username-form input").value;
}
function getGameName(){
    return document.querySelector("#game-name").value;
}
function getNumberOfPlayers(){
    const res = document.querySelector("#number-of-players").value;
    return parseInt(res);
}
function joinAGame(e){
    e.preventDefault();
    const requestBody = {"playerName": `${getUserName()}`};
    const path = `/games/${getJoinId()}/players`;
    fetchFromServer(path,'POST', requestBody).catch(errorHandler);
}
function createGame(e){
    e.preventDefault();
    const requestBody = {"prefix": `${getGameName()}`, "numberOfPlayers": getNumberOfPlayers()};
    fetchFromServer('/games', 'POST', requestBody).catch(errorHandler);
}