const hello = "hello";


var carouselJackpot = new Splide( '.js--splide--carousel-jackpot', {
	type   : 'loop',
	perPage: 3,
	perMove: 1,
} );
carouselJackpot.mount();
import carouselBanner from "./carouselBanner.js";


const bannerExist = document.getElementsByClassName("m-banner__car");

window.addEventListener("load", () => {
  if (bannerExist.length > 0) {
    carouselBanner();
  }
});


