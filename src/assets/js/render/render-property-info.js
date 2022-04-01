"use strict";

function renderPropertyBack(property) {
    const $tbody = document.querySelector('.property-card-back');
    $tbody.querySelector('h3').innerHTML = property.name;
    $tbody.querySelector('h4 span').innerHTML = property.rent;

    $tbody.querySelector('ul').insertAdjacentHTML("beforeend", `<li>With 1 house: ${property.rentWithOneHouse}</li>
                                                                                   <li>With 2 houses: ${property.rentWithTwoHouses}</li>
                                                                                   <li>With 3 houses: ${property.rentWithThreeHouses}</li>
                                                                                   <li>With 4 houses: ${property.rentWithFourHouses}</li>
                                                                                   <li>With hotel ${property.rentWithHotel}</li>`);


    $tbody.querySelector('ul + h4 span').innerHTML = property.mortgage;
    $tbody.querySelector('p:first-of-type span').innerHTML = property.housePrice;
    $tbody.querySelector('p + p span').innerHTML = property.housePrice;

}

function renderPropertyFront(searchProperty, game) {
    const $tbody = document.querySelector('.property-card-front');
    const propertyState = ["none", 0, 0];
    game.players.forEach(player => {
        player.properties.forEach(property => {
            if (property.property === searchProperty) {
                propertyState[0] = player.name;
            }
            propertyState[1] = property.houseCount;
            propertyState[2] = property.hotelCount;

            if (property.mortgage) {
                $tbody.querySelector('p:last-of-type span').innerHTML = "yes";
            }
            else{
                $tbody.querySelector('p:last-of-type span').innerHTML = "no";

            }
        });
    });


    $tbody.querySelector('h3').innerHTML = searchProperty;
    $tbody.querySelector('p:first-of-type').innerHTML = propertyState[0];

    $tbody.querySelector('ul').insertAdjacentHTML("beforeend", `<li>${propertyState[1]} house(s)</li>
                                                                                   <li>${propertyState[2]} hotel</li>`);

}


