import carouselJackpot from "./modules/carouselJackpot.js";
import carouselGrid from "./modules/carouselFull.js";
import popUpSaldo from "./modules/popUpBalance.js";
import collapseGrid from "./modules/collapseGridHalf.js";
import marginHeader from "./modules/marginHeader.js";

window.addEventListener('load', () => {
  carouselJackpot()
  carouselGrid()
  popUpSaldo()
  collapseGrid()
  marginHeader()
})
