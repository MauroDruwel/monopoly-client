"use strict";

function processLog(){
    const res = [];
    let log = "";
    let j = -6;
    if (_game.turns.length !== 0){
        if (_game.turns.length <= 6){
            j = -_game.turns.length;
        }
        for (let i = -1; i >= j; i--) {
            _game.turns.at(i).moves.forEach(move => {
                log = `${_game.turns.at(i).player} landed on ${move.tile}: ${move.description}`;
                res.push(log);
                renderLog(res);
            });
        }

    }
}
