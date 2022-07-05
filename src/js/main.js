import carouselBanner from "./carouselBanner.js";
import carouselJackpot from "./carouselJackpot.js";


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