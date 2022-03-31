function getAuctionValue() {
    return parseInt(document.querySelector('#offer').value);
}

function bid(e){
    e.preventDefault();
    const requestBody = {
        "bidder": "string",
        "amount": getAuctionValue()
    };
    fetchFromServer(`/games/${gameId}/players/${playerName}/auctions/${propertyName}/bid`, 'POST', requestBody).catch(errorHandler);
}
