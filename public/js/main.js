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

  const bannerExist = document.getElementsByClassName("m-banner__car");
  window.addEventListener("load", () => {
    if (bannerExist.length > 0) {
      carouselBanner();
    }
  });

})));
