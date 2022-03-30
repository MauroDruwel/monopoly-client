"use strict";
function checkIfGameHasStarted(response){
    if (response.started){
        document.querySelector("#waiting-form").setAttribute("class","hidden");
        document.querySelector("#select-pawn").setAttribute("class"," ");
    }
}