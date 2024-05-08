"use strict";

function renderUtility(utility, ownerName, mortgage){

    const $utilities = document.querySelectorAll(`[data-tile="${utility.nameAsPathParameter}"].tile`);

    $utilities.forEach($utility => {
        $utility.dataset.position = utility.position;

        $utility.querySelector('.header-grid h3').innerHTML = utility.name;
        $utility.querySelector('.footer-grid h4:first-of-type span').innerHTML = utility.cost;
        $utility.querySelector('.footer-grid h4:nth-of-type(2) span').innerHTML = mortgage;
        $utility.querySelector('.footer-grid h4:last-of-type span').innerHTML = ownerName;
    });
}
