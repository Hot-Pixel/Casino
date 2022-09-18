import popUpSaldo from "./modules/popUpBalance.js";
import marginHeader from "./modules/marginHeader.js";
import dataModify from "./modules/dataModify.js";
import historyNavBar from "./modules/historyNavBar.js";
import depositSteps from "./modules/depositSteps.js";
import depositAmmount from "./modules/depositAmmount.js";

window.addEventListener('load', () => {
  popUpSaldo()
  marginHeader()
  dataModify()
  historyNavBar()
  depositSteps();
  depositAmmount();
})