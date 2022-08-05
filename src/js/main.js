import carouselBanner from "./carouselBanner.js";
import carouselJackpot from "./carouselJackpot.js";
import carouselBets from "./carouselBets.js";
import collapseGrid from "./collapseGridHalf.js";
import filterCasino from "./filterCasino.js";
import filterPromo from "./filterPromo.js";
import filterSlotsAll from "./filterSlotsAll.js";

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
  }
  accorPoker();
});


function menuPoker() {
  const menuBtns = document.querySelectorAll(".menuPoker__btn");
  menuBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      menuBtns.forEach((btn) => {
        btn.classList.remove("is-active");
      });
      e.currentTarget.classList.toggle("is-active");
    });
  });
}

function accorPoker() {
  const accorArrows = document.getElementsByClassName("accorArrow");
  const accorBody = document.getElementsByClassName("body");

  for (let n = 0; n < accorArrows.length; n++) {
    accorArrows[n].addEventListener("click", () => {
      if (accorBody[n].classList.contains("active")) {
        gsap
          .timeline()
          .to(accorArrows[n], { rotation: -90, duration: 0.3 })
          .to(accorBody[n], { opacity: 0, duration: 0.3 })
          .to(accorBody[n], { height: 0, padding:0, duration: 0.3 });
        accorBody[n].classList.remove("active");
      } else {
        gsap
          .timeline()
          .to(accorArrows[n], { rotation: 0, duration: 0.3 })
          .to(accorBody[n], { height: "auto", padding: 15, duration: 0.3 })
          .to(accorBody[n], { opacity: 1, duration: 0.3 });
        accorBody[n].classList.add("active");
      }
    });
  }
}
