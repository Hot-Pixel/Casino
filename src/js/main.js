import sliderBanner from './carousel.js';

window.addEventListener("load", () => {
  if (jQuery(".m-banner__car").length > 0) {
    sliderBanner();
  }
});