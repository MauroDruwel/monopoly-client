"use strict";

/* String Convert Helpers */
function beautifyId(id){
    return capitalizeFirstLetter(id.replace(/_/g, ' '));
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function convertSpacesToUnderscores(string){
    return string.replace(/ /g, "_");
}

function convertUnderscoresToSpaces(string){
    return string.replace(/_/g, " ");
}

/* Event Helpers */

function addEventListenerToElements(type, handler, selector){
    const $elements = document.querySelectorAll(selector);
    $elements.forEach(($element) => $element.addEventListener(type, handler));
}

/* Element helpers */
function addClassToElements(selector, clss){
    document.querySelectorAll(selector).forEach($element => {
        $element.classList.add(clss);
    });
}

function removeClassFromElements(selector, clss){
    document.querySelectorAll(selector).forEach($element => {
        $element.classList.remove(clss);
    });
}
