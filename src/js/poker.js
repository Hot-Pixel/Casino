import carouselPoker from "./modules/carouselPoker.js";
import accordion from "./modules/accordion.js";
import PlaytechPoker from "./modules/playtechPoker.js";
import adaptationModule from "./modules/adaptationModule.js";

adaptationModule(".card__bottom-content");

document.addEventListener("DOMContentLoaded", () => {
  accordion();
  carouselPoker();
});

window.PlaytechPoker = PlaytechPoker;