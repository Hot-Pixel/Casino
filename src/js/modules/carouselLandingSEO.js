import { Splide } from "@splidejs/splide";

function carouselLandingSEO() {
	var carousel = new Splide(".carouselLandingSEO__carousel", {
		pagination: false,
		arrows: true,
		perPage: 5,
		padding: 0,
		perMove: 1,
		gap: 30,
		breakpoints: {
			1600: {
				perPage: 4
			},
			1280: {
				perPage: 3
			},
			1024: {
				perPage: 2
			},
			620: {
				perPage: 1
			}
		}
	} );
	carousel.mount();
}

export default carouselLandingSEO;
