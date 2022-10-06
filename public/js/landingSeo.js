import { c as carouselGrid } from './carouselGrid-6425979d.js';
import { p as popUpSaldo, m as marginHeader, d as depositSteps, a as depositAmmount, b as depositCopy, c as menuHeaderMobile } from './menuHeaderMobile-013e6314.js';
import './splide.esm-20cd2e1c.js';

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
});
//# sourceMappingURL=landingSeo.js.map
