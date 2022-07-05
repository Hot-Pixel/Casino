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

  const carouselBannerExist = document.getElementsByClassName("m-banner__car");
  const carouselJackpotExist = document.getElementsByClassName("js--splide--carousel-jackpot");
  window.addEventListener("load", () => {
    if (carouselBannerExist.length > 0) {
      carouselBanner();
    }

    if (carouselJackpotExist.length > 0) {
      carouselJackpot();
    }
  });

})));
