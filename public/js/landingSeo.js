import { c as carouselGrid } from './carouselGrid-6425979d.js';
import { p as popUpSaldo, m as marginHeader, d as depositSteps, a as depositAmmount, b as depositCopy, c as menuHeaderMobile } from './menuHeaderMobile-013e6314.js';
import { S as Splide } from './splide.esm-20cd2e1c.js';

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

let carouselGridSeo;

let data =[
	{
		id: ".gridFullSeo .splide",
		name: carouselGridSeo
	}
];

window.addEventListener("load", () => {
  carouselGrid(data[0].id, data[0].name);
  popUpSaldo();
  marginHeader();
  depositSteps();
  depositAmmount();
  depositCopy();
  menuHeaderMobile();
  carouselLandingSEO();
});
//# sourceMappingURL=landingSeo.js.map
