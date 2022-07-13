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
  valueNames: [
    { data: ["type"] },
    { data: ["provider"] },
    { data: ["fav"] }
  ],
};

var casinoGridFilter = new List("casino-filter", options);

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

const selectCasino = document.querySelector("#casino-provider");

selectCasino.addEventListener("change", () => {
  if (selectCasino.value == "one") {
    casinoGridFilter.filter(function (item) {
      return item.values().provider == "one";
    });
  } else if (selectCasino.value == "two") {
    casinoGridFilter.filter(function (item) {
      return item.values().provider == "two";
    });
  } else if (selectCasino.value == "three") {
    casinoGridFilter.filter(function (item) {
      return item.values().provider == "three";
    });
  }
});

const hearts = document.querySelectorAll(".o-casino__grid-fav");

hearts.forEach((heart) => {
  heart.addEventListener("click", () => {
    heart.classList.toggle("fav");
    if (heart.classList.contains("fav")) {
      heart.parentElement.parentElement.setAttribute("data-fav", "true");
    } else {
      heart.parentElement.parentElement.setAttribute("data-fav", "false");
    }
  });
});

const btnFav = document.querySelector("#casino-fav");
btnFav.addEventListener("click", () => {
  casinoGridFilter.reIndex();
  casinoGridFilter.filter(function (item) {
    console.log(item.values())
    return item.values().fav === "true";
  });
});
