import favHeart from "./modules/favHeart.js";
import filterSlotsAll from "./modules/filterSlotsAll.js";
import accordion from "./modules/accordion.js";
import popUpSaldo from "./modules/popUpBalance.js";
import marginHeader from "./modules/marginHeader.js";
import depositSteps from "./modules/depositSteps.js";
import depositAmmount from "./modules/depositAmmount.js";

window.addEventListener("load", () => {
  accordion();
  filterSlotsAll();
  favHeart();
  popUpSaldo();
  marginHeader();
  depositSteps();
  depositAmmount();
});
