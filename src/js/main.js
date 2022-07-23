import carouselBanner from "./carouselBanner.js";
import carouselJackpot from "./carouselJackpot.js";
import carouselBets from "./carouselBets.js";
import collapseGrid from "./collapseGridHalf.js";
import filterCasino from "./filterCasino.js";
import filterSlotsAll from "./filterSlotsAll.js";

const carouselBannerExist = document.getElementsByClassName("m-banner__car");
const carouselJackpotExist = document.getElementsByClassName("js--splide--carousel-jackpot");
const carouselBetsExist = document.getElementsByClassName("js--splide--carousel-bets");
const gridHalfExist = document.getElementsByClassName("m-grid__half");
const casinoFinderExist = document.getElementsByClassName("m-casino--finder");
const slotsAllFinderExist = document.getElementsByClassName("m-slots--finder");

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
});


