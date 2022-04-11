"use strict";

function renderUtilityTile(utility, owner){

    // data set in selector is added. Why? Select specific tile from html to render with this data-tile value !!!
    // What does this mean? The data-tile value needs to be set before this function is called! [! IMPORTANT]
    const $utilities = document.querySelectorAll(`[data-tile="${utility.nameAsPathParameter}"]`);

    $utilities.forEach($utility => {
        $utility.dataset.position = utility.position;

        $utility.querySelector('.header-grid h3').innerHTML = utility.name;
        $utility.querySelector('.footer-grid h4:first-of-type').innerHTML = utility.cost;
        $utility.querySelector('.footer-grid h4:last-of-type').innerHTML = owner;
    });
}
