import carouselJackpot from "./modules/carouselJackpot.js";
import carouselGrid from "./modules/carouselGrid.js";
import collapseGrid from "./modules/collapseGridHalf.js";

document.addEventListener('DOMContentLoaded', () => {
  carouselJackpot();
  document.querySelectorAll('.gridFull .splide').forEach(grid => {
    carouselGrid(grid);
  });
  collapseGrid();
})
