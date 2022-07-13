(function (factory) {
  typeof define === 'function' && define.amd ? define('main', factory) :
  factory();
}((function () { 'use strict';

  function carouselBanner() {
    var carousel = new Splide(".m-banner__car.splide", {
      perPage: 1,
      arrow: true,
      pagination: false
    });
    carousel.mount();
  }

  function carouselJackpot() {
    var carousel = new Splide('.js--splide--carousel-jackpot', {
      type: 'loop',
      pagination: false,
      perPage: 4,
      perMove: 1,
      gap: 15,
      breakpoints: {
        1200: {
          perPage: 2
        }
      }
    });
    carousel.mount();
  }

  function carouselBets() {
    var carousel = new Splide('.js--splide--carousel-bets', {
      type: 'loop',
      pagination: false,
      perPage: 5,
      perMove: 1,
      gap: 15,
      breakpoints: {
        1600: {
          perPage: 4
        },
        1200: {
          perPage: 3
        },
        992: {
          perPage: 2
        }
      }
    });
    carousel.mount();
  }

  const arrowArr = document.getElementsByClassName("js-arrow__grid");
  const gridArr = document.getElementsByClassName("o-grid__half--grid");

  function collapseGrid() {
    for (let n = 0; n < arrowArr.length; n++) {
      arrowArr[n].addEventListener("click", () => {
        if (gridArr[n].classList.contains("active")) {
          gsap.timeline().to(arrowArr[n], {
            rotation: -90,
            duration: 0.3
          }).to(gridArr[n], {
            opacity: 0,
            duration: 0.6
          }).to(gridArr[n], {
            height: 0,
            duration: 0.3
          });
          gridArr[n].classList.remove("active");
        } else {
          gsap.timeline().to(arrowArr[n], {
            rotation: 0,
            duration: 0.3
          }).to(gridArr[n], {
            height: "auto",
            duration: 0.3
          }).to(gridArr[n], {
            opacity: 1,
            duration: 0.6
          });
          gridArr[n].classList.add("active");
        }
      });
    }
  }

  const carouselBannerExist = document.getElementsByClassName("m-banner__car");
  const carouselJackpotExist = document.getElementsByClassName("js--splide--carousel-jackpot");
  const carouselBetsExist = document.getElementsByClassName("js--splide--carousel-bets");
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
    valueNames: [{
      data: ["type"]
    }, {
      data: ["provider"]
    }, {
      data: ["fav"]
    }]
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
  hearts.forEach(heart => {
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
      console.log(item.values());
      return item.values().fav === "true";
    });
  });

})));
