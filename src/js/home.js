import carouselBanner from "./modules/carouselBanner.js";
import carouselJackpot from "./modules/carouselJackpot.js";
import accordionDeposit from "./modules/accordionDeposit.js";
import carouselBets from "./modules/carouselBets.js";
import carouselGrid from "./modules/carouselFull.js";
import popUpSaldo from "./modules/popUpBalance.js";
import collapseGrid from "./modules/collapseGridHalf.js";
import marginHeader from "./modules/marginHeader.js";
import depositSteps from "./modules/depositSteps.js";
import depositAmmount from "./modules/depositAmmount.js";
import depositCopy from "./modules/depositCopy.js";

window.addEventListener("load", () => {
  accordionDeposit();
  carouselBanner();
  carouselJackpot();
  carouselBets();
  carouselGrid();
  popUpSaldo();
  collapseGrid();
  marginHeader();
  depositSteps();
  depositAmmount();
  depositCopy();
});


