import carouselJackpot from "./modules/carouselJackpot.js";
import carouselGrid from "./modules/carouselGrid.js";
import popUpSaldo from "./modules/popUpBalance.js";
import collapseGrid from "./modules/collapseGridHalf.js";
import marginHeader from "./modules/marginHeader.js";
import depositSteps from "./modules/depositSteps.js";
import depositAmmount from "./modules/depositAmmount.js";
import depositCopy from "./modules/depositCopy.js";
import menuHeaderMobile from "./modules/menuHeaderMobile.js";
import userMenuMobile from "./modules/userMenuMobile.js";

window.addEventListener('load', () => {
  carouselJackpot()
  document.querySelectorAll('.gridFull .splide').forEach(grid => {
    carouselGrid(grid);
  });
  popUpSaldo()
  collapseGrid()
  marginHeader()
  depositSteps();
  depositAmmount();
  depositCopy();
  menuHeaderMobile();
  userMenuMobile()
})
