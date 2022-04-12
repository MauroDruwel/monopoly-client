"use strict";

function renderRailroad(railroad, ownerName, mortgage){

    // data set in selector is added. Why? Select specific tile from html to render with this data-tile value !!!
    // What does this mean? The data-tile value needs to be set before this function is called! [! IMPORTANT]
    const $railroads = document.querySelectorAll(`[data-tile="${railroad.nameAsPathParameter}"].tile`);

    $railroads.forEach($railroad => {
        $railroad.dataset.position = railroad.position;
        console.log($railroad);
        $railroad.querySelector('.body-grid h3').innerHTML = railroad.name;
        $railroad.querySelector('.body-grid h4:first-of-type span').innerHTML = railroad.cost;
        $railroad.querySelector('.body-grid h4:nth-of-type(2) span').innerHTML = mortgage;
        $railroad.querySelector('.body-grid h4:last-of-type span').innerHTML = ownerName;
    });
}
