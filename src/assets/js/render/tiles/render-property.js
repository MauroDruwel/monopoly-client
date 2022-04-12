"use strict";

function renderPropertyBack(property) {

    // data set in selector is added. Why? Select specific property from html to render with this data-tile value !!!
    // What does this mean? The data-tile value needs to be set before this function is called! [! IMPORTANT]
    const $properties = document.querySelectorAll(`[data-tile="${property.nameAsPathParameter}"].property-back.tile`);

    $properties.forEach($property => {

        // set dataset values
        $property.dataset.color = property.color.toLowerCase();
        $property.dataset.position = property.position;

        $property.querySelector('.grid-header h3').innerHTML = property.name;
        $property.querySelector('.grid-body h4:first-of-type span').innerHTML = property.rent;

        $property.querySelector('.grid-body ul').insertAdjacentHTML("beforeend",
            `<li>With 1 house: ${property.rentWithOneHouse}</li>
                <li>With 2 houses: ${property.rentWithTwoHouses}</li>   
                <li>With 3 houses: ${property.rentWithThreeHouses}</li>
                <li>With 4 houses: ${property.rentWithFourHouses}</li>
                <li>With hotel: ${property.rentWithHotel}</li>`
        );


        $property.querySelector('.grid-body h4:last-of-type span').innerHTML = property.mortgage;
        $property.querySelector('.grid-body p:first-of-type span').innerHTML = property.housePrice;
        $property.querySelector('.grid-body p:first-of-type + p span').innerHTML = property.housePrice;
    });
}



function renderPropertyFront(property, ownerName, mortgage, houseCount, hotelCount) {

    // data set in selector is added. Why? Select specific property from html to render with this data-tile value !!!
    // What does this mean? The data-tile value needs to be set before this function is called! [! IMPORTANT]
    const $properties = document.querySelectorAll(`[data-tile="${property.nameAsPathParameter}"].property-front.tile`);

    $properties.forEach($property => {

        // set dataset values
        $property.dataset.color = property.color.toLowerCase();
        $property.dataset.position = property.position;

        $property.querySelector('.grid-header h3').innerHTML = property.name;
        $property.querySelector('.grid-body p:first-of-type span').innerHTML = ownerName; // set owner
        $property.querySelector('.grid-body ul').insertAdjacentHTML("beforeend",
            `<li>${houseCount} house(s)</li>
                <li>${hotelCount} hotel(s)</li>`
        );
        $property.querySelector('.grid-body p:last-of-type span').innerHTML = mortgage;
    });
}
