import carouselJackpot from "./modules/carouselJackpot.js";
import carouselGrid from "./modules/carouselFull.js";
import popUpSaldo from "./modules/popUpBalance.js";
import collapseGrid from "./modules/collapseGridHalf.js";
import marginHeader from "./modules/marginHeader.js";
import depositSteps from "./modules/depositSteps.js";
import depositAmmount from "./modules/depositAmmount.js";

window.addEventListener('load', () => {
  carouselJackpot()
  carouselGrid()
  popUpSaldo()
  collapseGrid()
  marginHeader()
  depositSteps();
  depositAmmount();
})
