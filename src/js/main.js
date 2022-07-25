import carouselBanner from "./carouselBanner.js";
import carouselJackpot from "./carouselJackpot.js";
import carouselBets from "./carouselBets.js";
import collapseGrid from "./collapseGridHalf.js";
import filterCasino from "./filterCasino.js";
import filterPromo from "./filterPromo.js";
import filterSlotsAll from "./filterSlotsAll.js";

const carouselBannerExist = document.getElementsByClassName("banner__car");
const carouselJackpotExist = document.getElementsByClassName("jackpot__carousel");
const carouselBetsExist = document.getElementsByClassName("carouselBets__carousel");
const gridHalfExist = document.getElementsByClassName("gridHalf");
const casinoFinderExist = document.getElementsByClassName("m-casino--finder");
const slotsAllFinderExist = document.getElementsByClassName("m-slots--finder");
const promoFinderExist = document.getElementsByClassName("finder__promo");

window.addEventListener("load", () => {
  if (carouselBannerExist.length > 0) {
    carouselBanner();
  }
  if (carouselJackpotExist.length > 0) {
    carouselJackpot();
  }
  if (carouselBetsExist.length > 0) {
    carouselBets();
  }
  if (gridHalfExist.length > 0) {
    collapseGrid();
  }
  if (casinoFinderExist.length > 0) {
    filterCasino();
  }
  if (slotsAllFinderExist.length > 0) {
    filterSlotsAll();
  }
  if (promoFinderExist.length > 0) {
    filterPromo();
  }
});


