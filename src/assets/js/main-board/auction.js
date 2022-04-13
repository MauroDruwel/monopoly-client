function getAuctionValue() {
    return parseInt(document.querySelector('#offer').value);
}

function bid(e){
    e.preventDefault();
    const requestBody = {
        "bidder": "string",
        "amount": getAuctionValue()
    };
    fetchFromServer(`/games/${_player.gameId}/players/${_player.username}/auctions/${propertyName}/bid`, 'POST', requestBody).catch(errorHandler);
}
function checkToSellBuildings(){
    const $checkbox = document.querySelector("#setup-auction button[value=sell-buildings]");
    const tiles = [];
    if ($checkbox.classList.contains("active")){
        if (_tiles[_player.carousel].type === "steet"){
            const streetColor = _tiles[_player.carousel].color;
            _tiles.forEach(tile =>{
                if (tile === streetColor){
                    tiles.push(tile.name);
                }
            });
        }
        sellBuildings(tiles);
    }
}

function sellBuildings(tiles){
    let highestHouseCount = 0;
    _game.players.forEach(player => {
        do {
            tiles.forEach(tile => {
                player.properties.forEach(propertie => {
                    if (propertie.houseCount > highestHouseCount) {
                        highestHouseCount = propertie.houseCount;
                    }
                    if (tile === propertie.name && propertie.hotelCount !== 0) {
                        notBuyProperty("hotel");
                    } else if (tile === propertie.name && propertie.houseCount !== 0) {
                        notBuyProperty("houses");
                    }
                });
            });
            highestHouseCount--;
        }while (highestHouseCount > 0);
    });
}
