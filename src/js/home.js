import carouselBanner from "./modules/carouselBanner.js";
import carouselJackpot from "./modules/carouselJackpot.js";
import accordionDeposit from "./modules/accordionDeposit.js";
import carouselBets from "./modules/carouselBets.js";
import carouselGrid from "./modules/carouselGrid.js";
import popUpSaldo from "./modules/popUpBalance.js";
import collapseGrid from "./modules/collapseGridHalf.js";
import marginHeader from "./modules/marginHeader.js";
import depositSteps from "./modules/depositSteps.js";
import depositAmmount from "./modules/depositAmmount.js";
import depositCopy from "./modules/depositCopy.js";
import menuHeaderMobile from "./modules/menuHeaderMobile.js";
import userMenuMobile from "./modules/userMenuMobile.js";

let carouselGridA, carouselGridB;

let data =[
  {
    id: ".gridFullA .splide",
    name: carouselGridA
  },
  {
    id: ".gridFullB .splide",
    name: carouselGridB
  }
]


window.addEventListener("load", () => {
  accordionDeposit();
  carouselBanner();
  carouselJackpot();
  carouselBets();
  carouselGrid(data[0].id, data[0].name);
  carouselGrid(data[1].id, data[1].name);
  popUpSaldo();
  collapseGrid();
  marginHeader();
  depositSteps();
  depositAmmount();
  depositCopy();
  menuHeaderMobile();
  userMenuMobile()
});


