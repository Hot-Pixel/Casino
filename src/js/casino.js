import filterCasino from "./modules/filterCasino.js";
import popUpSaldo from "./modules/popUpBalance.js";
import marginHeader from "./modules/marginHeader.js";
import depositSteps from "./modules/depositSteps.js";
import depositAmmount from "./modules/depositAmmount.js";
import depositCopy from "./modules/depositCopy.js";

window.addEventListener('load', () => {
  filterCasino()
  popUpSaldo()
  marginHeader()
  depositSteps();
  depositAmmount();
  depositCopy();
})
