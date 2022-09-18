import accordion from "./modules/accordion.js";
import popUpSaldo from "./modules/popUpBalance.js";
import marginHeader from "./modules/marginHeader.js";
import depositSteps from "./modules/depositSteps.js";
import depositAmmount from "./modules/depositAmmount.js";

window.addEventListener("load", () => {
  accordion();
  popUpSaldo();
  marginHeader();
  depositSteps();
  depositAmmount();
});

