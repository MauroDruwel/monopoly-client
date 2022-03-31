"use strict";
function checkIfGameHasStarted(response){
    if (response.started){

        document.querySelector("#waiting-form").classList.add("hidden");
        document.querySelector("#select-pawn").classList.remove("hidden");
    }
}
