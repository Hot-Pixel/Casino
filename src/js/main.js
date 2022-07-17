import carouselBanner from "./carouselBanner.js";
import carouselJackpot from "./carouselJackpot.js";
import carouselBets from "./carouselBets.js";
import collapseGrid from "./collapseGridHalf.js";

const carouselBannerExist = document.getElementsByClassName("m-banner__car");
const carouselJackpotExist = document.getElementsByClassName(
  "js--splide--carousel-jackpot"
);
const carouselBetsExist = document.getElementsByClassName(
  "js--splide--carousel-bets"
);
const gridHalfExist = document.getElementsByClassName("m-grid__half");

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
});

const hearts = document.querySelectorAll(".o-casino__grid-fav");

hearts.forEach((heart) => {
  heart.addEventListener("click", () => {
    heart.classList.toggle("fav");
    if (heart.classList.contains("fav")) {
      heart.parentElement.parentElement.classList.add("favourite");
    } else {
      heart.parentElement.parentElement.classList.remove("favourite");
    }
  });
});

var mixer = mixitup(".m-casino__filter", {
  multifilter: {
    enable: true,
  },
  selectors: {
    target: ".o-casino__grid-item",
  },
  controls: {
    enable: true,
  },
  animation: {
    enable: false,
  },
});
