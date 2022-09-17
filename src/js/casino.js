import filterCasino from "./modules/filterCasino.js";
import popUpSaldo from "./modules/popUpBalance.js";
import marginHeader from "./modules/marginHeader.js";

window.addEventListener('load', () => {
  filterCasino()
  popUpSaldo()
  marginHeader()
})
