import filterPromo from "./modules/filterPromo.js";
import popUpSaldo from "./modules/popUpBalance.js";
import marginHeader from "./modules/marginHeader.js";
import carouselPromociones from "./modules/carouselPromociones.js";
import depositSteps from "./modules/depositSteps.js";
import depositAmmount from "./modules/depositAmmount.js";

window.addEventListener('load', () => {
  filterCasino()
  popUpSaldo()
  marginHeader()
  depositSteps();
  depositAmmount();
  filterPromo()
  carouselPromociones()
})