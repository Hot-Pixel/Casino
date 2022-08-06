import { Splide } from "@splidejs/splide";
import { Grid } from "@splidejs/splide-extension-grid";

import carouselBanner from "./carouselBanner.js";
import carouselJackpot from "./carouselJackpot.js";
import carouselBets from "./carouselBets.js";
import collapseGrid from "./collapseGridHalf.js";
import filterCasino from "./filterCasino.js";
import filterPromo from "./filterPromo.js";
import filterSlotsAll from "./filterSlotsAll.js";
import menuPoker from "./menuPoker.js";
import accorPoker from "./accordionPoker.js";
import carouselFull from "./carouselFull.js";

const carouselBannerExist = document.getElementsByClassName("bannerCarousel");
const carouselJackpotExist =
  document.getElementsByClassName("jackpot__carousel");
const carouselBetsExist = document.getElementsByClassName(
  "carouselBets__carousel"
);
const gridHalfExist = document.getElementsByClassName("gridHalf");
const casinoFinderExist = document.getElementsByClassName("casinoFinder");
const slotsAllFinderExist = document.getElementsByClassName("m-slots--finder");
const promoFinderExist = document.getElementsByClassName("finder__promo");
const menuPokerExist = document.getElementsByClassName("menuPoker");
const carouselFullExist = document.getElementsByClassName("gridFull");

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
  if (menuPokerExist.length > 0) {
    menuPoker();
    accorPoker();
  }
  if (carouselFullExist.length > 0) {
    carouselFull();
  }
});


