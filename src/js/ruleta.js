import popUpSaldo from "./modules/popUpBalance.js";
import marginHeader from "./modules/marginHeader.js";
// import dataModify from "./modules/dataModify.js";
import favHeart from "./modules/favHeart.js";
import filterWheel from "./modules/filterWheel.js";
import depositSteps from "./modules/depositSteps.js";
import depositAmmount from "./modules/depositAmmount.js";
import depositCopy from "./modules/depositCopy.js";

window.addEventListener('load', () => {
  popUpSaldo()
  marginHeader()
  favHeart()
  depositSteps()
  depositAmmount()
  filterWheel()
  depositCopy();
})