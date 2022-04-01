"use strict";

function renderPropertyBack(property){
    document.querySelector('#tile').classList.remove('hidden');
    const $template = document.querySelector('#front-card');
    const $tr = $template.content.firstElementChild.cloneNode(true);

    const $tbody = document.querySelector('#front-card-container');
    $tbody.innerHTML = $template.outerHTML; // reset html

    $tr.querySelector('h3').innerHTML = property.name;
    $tr.querySelector('h4 span').innerHTML = property.rent;

    $tr.querySelector('ul').insertAdjacentHTML("beforeend", `<li>With 1 appartement: ${property.rentWithOneHouse}</li>`);
    $tr.querySelector('ul').insertAdjacentHTML("beforeend", `<li>With 2 appartement: ${property.rentWithTwoHouses}</li>`);
    $tr.querySelector('ul').insertAdjacentHTML("beforeend", `<li>With 3 appartement: ${property.rentWithThreeHouses}</li>`);
    $tr.querySelector('ul').insertAdjacentHTML("beforeend", `<li>With 4 appartement: ${property.rentWithFourHouses}</li>`);
    $tr.querySelector('ul').insertAdjacentHTML("beforeend", `<li>With hotel ${property.rentWithHotel}</li>`);

    $tr.querySelector('ul + h4 span').innerHTML = property.mortgage;
    $tr.querySelector('p:first-of-type span').innerHTML = property.housePrice;
    $tr.querySelector('p + p span').innerHTML = property.housePrice;

    $tbody.insertAdjacentHTML("beforeend", $tr.outerHTML);
}

function renderPropertyFront(searchProperty, game){
    const propertyState = ["none", 0, 0, "no"];
    game.players.forEach(player => {
        player.properties.forEach(property => {
            if (property.property === searchProperty){
                propertyState[0] = player.name;
            }
            propertyState[1] = property.houseCount;
            propertyState[2] = property.hotelCount;
            if (property.mortgage){
                propertyState[3] = "yes";
            }
        });
    });
    document.querySelector('#tile').classList.remove('hidden');
    const $template = document.querySelector('#back-card');
    const $tr = $template.content.firstElementChild.cloneNode(true);
    const $tbody = document.querySelector('#back-card-container');

    $tr.querySelector('h3').innerHTML = searchProperty;
    $tr.querySelector('p:first-of-type').innerHTML = propertyState[0];

    $tr.querySelector('ul').insertAdjacentHTML("beforeend", `<li>${propertyState[1]} house(s)</li>`);
    $tr.querySelector('ul').insertAdjacentHTML("beforeend", `<li>${propertyState[2]} hotel)</li>`);

    $tr.querySelector('p:last-of-type span').innerHTML = propertyState[3];

    $tbody.insertAdjacentHTML("beforeend", $tr.outerHTML);

}


