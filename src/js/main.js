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

var options = {
  valueNames: ["name", {data: ["type"]}],
};

var casinoGridFilter = new List("casino-filter", options);

console.log(casinoGridFilter);

const btnAll = document.querySelector("#casino-all");
btnAll.addEventListener("click", () => {
  casinoGridFilter.filter();
});

const btnJack = document.querySelector("#casino-blackjack");
btnJack.addEventListener("click", () => {
  casinoGridFilter.filter(function (item) {
    return item.values().type == "blackjack";
  });
});

const btnRuleta = document.querySelector("#casino-ruleta");
btnRuleta.addEventListener("click", () => {
  casinoGridFilter.filter(function (item) {
    return item.values().type == "ruleta";
  });
});