"use strict";

function renderFrondTiles(property){
    document.querySelector('#tile').classList.remove('hidden');
    const $template = document.querySelector('#frond-card');
    const $tr = $template.content.firstElementChild.cloneNode(true);

    const $tbody = document.querySelector('#frond-card-container');
    //$tbody.innerHTML = $template.outerHTML; // reset html

    $tr.querySelector('h3').innerHTML = property.name;
    $tr.querySelector('h4 span').innerHTML = property.rent;

    $tr.querySelector('ul').insertAdjacentHTML("beforeend", `<li>With 1 appartement: ${property.rentWithOneHouse}</li>`);
    $tr.querySelector('ul').insertAdjacentHTML("beforeend", `<li>With 2 appartement: ${property.rentWithTwoHouses}</li>`);
    $tr.querySelector('ul').insertAdjacentHTML("beforeend", `<li>With 3 appartement: ${property.rentWithThreeHouses}</li>`);
    $tr.querySelector('ul').insertAdjacentHTML("beforeend", `<li>With 4 appartement: ${property.rentWithFourHouses}</li>`);
    $tr.querySelector('ul').insertAdjacentHTML("beforeend", `<li>With hotel ${property.rentWithHotel}</li>`);

    $tr.querySelector('ul + h4 span').innerHTML = property.mortgage;
    $tr.querySelector('p:first-of-type span').innerHTML = property.housePrice;


    $tbody.insertAdjacentHTML("beforeend", $tr.outerHTML);
}

function renderBackTiles(property){
    document.querySelector('#tile').classList.remove('hidden');
    const $template = document.querySelector('#back-card');
    const $tr = $template.content.firstElementChild.cloneNode(true);

    const $tbody = document.querySelector('#back-card-container');


}

async function getOwner(searchProperty){
    let res = null;
     return fetchFromServer(`/games/${_player.gameId}`, "GET").then(response => {
        response.players.forEach(player => {
            player.properties.forEach(property => {
                if (property.property === searchProperty){
                    res = player.name;
                    return res;
                }
            });
        });
        return res;
    }).catch(errorHandler);
}