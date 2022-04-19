"use strict";

function processLog(){
    const res = [];
    let log = "";
    if (_game.turns.length !== 0){
        for (let i = -1; i >= -6; i--) {
            _game.turns.at(i).moves.forEach(move => {
                log = `${_game.turns.at(i).player} landed on ${move.tile}: ${move.description}`;
                res.push(log);
                renderLog(res);
            });
        }

    }
}
