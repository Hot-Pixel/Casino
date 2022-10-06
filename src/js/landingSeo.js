import carouselGrid from "./modules/carouselGrid.js";
import popUpSaldo from "./modules/popUpBalance.js";
import marginHeader from "./modules/marginHeader.js";
import depositSteps from "./modules/depositSteps.js";
import depositAmmount from "./modules/depositAmmount.js";
import depositCopy from "./modules/depositCopy.js";
import menuHeaderMobile from "./modules/menuHeaderMobile.js";
import carouselLandingSEO from "./modules/carouselLandingSEO.js";

let carouselGridSeo;

let data =[
	{
		id: ".gridFullSeo .splide",
		name: carouselGridSeo
	}
]

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