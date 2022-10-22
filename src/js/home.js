import carouselBanner from "./modules/carouselBanner.js";
import carouselJackpot from "./modules/carouselJackpot.js";
// import carouselBets from "./modules/carouselBets.js";
import collapseGrid from "./modules/collapseGridHalf.js";
import carouselGrid from "./modules/carouselGrid.js";

document.addEventListener("DOMContentLoaded", () => {
  carouselBanner();
  carouselJackpot();
  // carouselBets();
  collapseGrid();

  document.querySelectorAll('.gridFull .splide').forEach(grid => {
    carouselGrid(grid);
  });
});
