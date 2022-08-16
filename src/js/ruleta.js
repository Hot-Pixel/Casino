import filterCasino from "./modules/filterCasino.js";

const casinoFinderExist = document.getElementsByClassName("casinoFinder");

window.addEventListener("load", () => {
  if (casinoFinderExist.length > 0) {
    filterCasino();
  }
});