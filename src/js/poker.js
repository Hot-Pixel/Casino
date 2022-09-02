import menuPoker from "./modules/menuPoker.js";
import carouselPoker from "./modules/carouselPoker.js";
import accordion from "./modules/accordion.js";

const menuPokerExist = document.getElementsByClassName("menuPoker");

window.addEventListener("load", () => {
  if (menuPokerExist.length > 0) {
    accordion();
    carouselPoker();
  }
});



