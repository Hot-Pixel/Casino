import carouselPoker from "./modules/carouselPoker.js";
import accordion from "./modules/accordion.js";
import PlaytechPoker from "./modules/playtechPoker.js";

document.addEventListener("DOMContentLoaded", () => {
  accordion();
  carouselPoker();
});

window.PlaytechPoker = PlaytechPoker;