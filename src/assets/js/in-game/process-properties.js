"use strict";

function getProperties(properties){
    properties.forEach(property => {
        if (property.type === "street"){
            // renderTiles(property);
            console.log("property", property);
        }
        else if (property.type === "railroad"){
            //console.log("railroad", property);
        }
        else if (property.type === "utility"){
            //console.log("utility", property);
        }
    });
}
