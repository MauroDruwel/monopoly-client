function getAuctionValue() {
    return parseInt(document.querySelector('#offer').value);
}

function bid(e){
    e.preventDefault();
    const requestbody = {
        "bidder": "string",
        "amount": getAuctionValue()
    };
    fetchFromServer(`/games/${gameId}/players/${playerName}/auctions/${propertyName}/bid`, 'POST', requestbody).catch(errorHandler);
}
