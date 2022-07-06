import carouselBanner from "./carouselBanner.js";
import carouselJackpot from "./carouselJackpot.js";
import collapseGrid from "./collapseGridHalf.js";

const carouselBannerExist = document.getElementsByClassName("m-banner__car");
const carouselJackpotExist = document.getElementsByClassName("js--splide--carousel-jackpot");
const gridHalfExist = document.getElementsByClassName("m-grid__half");

const arrowArr = document.querySelectorAll(".js-arrow__grid");
const gridArr = document.querySelectorAll(".o-grid__half--grid");

window.addEventListener("load", () => {
	if (carouselBannerExist.length > 0) {
		carouselBanner();
	}
	if (carouselJackpotExist.length > 0) {
		carouselJackpot();
	}
	if (gridHalfExist.length > 0) {
		collapseGrid();
	}
});

