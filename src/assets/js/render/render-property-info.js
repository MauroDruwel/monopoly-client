"use strict";

function renderPropertyBack(property){
    const $tbody = document.querySelector('.property-card-back');
    //$tbody.innerHTML = $template.outerHTML; // reset html

    $tbody.querySelector('h3').innerHTML = property.name;
    $tbody.querySelector('h4 span').innerHTML = property.rent;

    $tbody.querySelector('ul').insertAdjacentHTML("beforeend", `<li>With 1 appartement: ${property.rentWithOneHouse}</li>`);
    $tbody.querySelector('ul').insertAdjacentHTML("beforeend", `<li>With 2 appartement: ${property.rentWithTwoHouses}</li>`);
    $tbody.querySelector('ul').insertAdjacentHTML("beforeend", `<li>With 3 appartement: ${property.rentWithThreeHouses}</li>`);
    $tbody.querySelector('ul').insertAdjacentHTML("beforeend", `<li>With 4 appartement: ${property.rentWithFourHouses}</li>`);
    $tbody.querySelector('ul').insertAdjacentHTML("beforeend", `<li>With hotel ${property.rentWithHotel}</li>`);

    $tbody.querySelector('ul + h4 span').innerHTML = property.mortgage;
    $tbody.querySelector('p:first-of-type span').innerHTML = property.housePrice;
    $tbody.querySelector('p + p span').innerHTML = property.housePrice;

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
    const $tbody = document.querySelector('.property-card-front');

    $tbody.querySelector('h3').innerHTML = searchProperty;
    $tbody.querySelector('p:first-of-type').innerHTML = propertyState[0];

    $tbody.querySelector('ul').insertAdjacentHTML("beforeend", `<li>${propertyState[1]} house(s)</li>`);
    $tbody.querySelector('ul').insertAdjacentHTML("beforeend", `<li>${propertyState[2]} hotel)</li>`);

    $tbody.querySelector('p:last-of-type span').innerHTML = propertyState[3];


}


