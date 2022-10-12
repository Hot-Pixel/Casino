import carouselGrid from "./modules/carouselGrid.js";
import carouselLandingSEO from "./modules/carouselLandingSEO.js";

let carouselGridSeo;

window.addEventListener("load", () => {
  document.querySelectorAll('.gridFull .splide').forEach(grid => {
    carouselGrid(grid);
  });
  carouselLandingSEO();
});
