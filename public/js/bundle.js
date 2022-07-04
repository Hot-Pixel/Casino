(() => {
  // src/js/carousel.js
  function sliderBanner() {
    const sliderBanner2 = new Splide(".m-banner__car", {
      arrow: true,
      pagination: false,
      perPage: 1
    });
    sliderBanner2.mount();
  }
  var carousel_default = sliderBanner;

  // src/js/main.js
  window.addEventListener("load", () => {
    if (jQuery(".m-banner__car").length > 0) {
      carousel_default();
    }
  });
})();
