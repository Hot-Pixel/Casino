import carouselBanner from "./carouselBanner.js";


const bannerExist = document.getElementsByClassName("m-banner__car");

window.addEventListener("load", () => {
  if (bannerExist.length > 0) {
    carouselBanner();
  }
});


