"use strict";

window.addEventListener("load", function () {
  if (jQuery(".m-banner__car").length > 0) {
    sliderBanner();
  }
});

function sliderBanner() {
  var sliderBanner = new Splide(".m-banner__car", {
    arrow: true,
    pagination: false,
    perPage: 1
  });
  sliderBanner.mount();
}

sliderBanner();