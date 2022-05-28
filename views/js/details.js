"use strict";

const above = document.getElementById("above");
const aboveImages = Array.from(above.children);

const below = document.getElementById("below");
const belowImages = Array.from(below.children);

aboveImages.forEach(element => {

    let aboveImage = document.getElementById(element.id);
    aboveImage.style.display = (element.id.split(".")[0] === "above1" ? "flex" : "none" );

}); 

belowImages.forEach(element => {

    let belowImage = document.getElementById(element.id);
    belowImage.addEventListener('click', () => { 
      hideAboveImage();
      let aboveImage = document.getElementById("above" + belowImage.id);
      aboveImage.style.display = "flex";

     } );
    
});

function hideAboveImage() {

  aboveImages.forEach(element => {

    let aboveImage = document.getElementById(element.id);
    aboveImage.style.display ="none";

  }); 
}