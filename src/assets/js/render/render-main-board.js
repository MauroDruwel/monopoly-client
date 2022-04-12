"use strict";

function renderDiceRole(){
    if(_game["lastDiceRoll"]){
        document.querySelector('#dice-container .dice-right').innerHTML = _game["lastDiceRoll"][0];
        document.querySelector('#dice-container .dice-left').innerHTML = _game["lastDiceRoll"][1];
    }
}
