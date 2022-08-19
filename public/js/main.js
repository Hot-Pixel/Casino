import carouselBanner from "./modules/carouselBanner.js";
import carouselJackpot from "./modules/carouselJackpot.js";
import carouselBets from "./modules/carouselBets.js";
import collapseGrid from "./modules/collapseGridHalf.js";
import filterCasino from "./modules/filterCasino.js";
import filterPromo from "./modules/filterPromo.js";
import filterSlotsAll from "./modules/filterSlotsAll.js";
import menuPoker from "./modules/menuPoker.js";
import accordion from "./modules/accordion.js";
import carouselFull from "./modules/carouselFull.js";

import { Splide } from "@splidejs/splide";

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

var carouselPoker = new Splide(".menuPoker .splide", {
  pagination: false,
  arrows: false,
  perPage: 4,
  padding: { left: 0, right: 100 },
  perMove: 1,
  breakpoints: {
    768: {
      perPage: 3,
    },
    576: {
      perPage: 2,
    }
  }
});
carouselPoker.mount();

