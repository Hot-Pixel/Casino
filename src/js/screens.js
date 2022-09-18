import popUpSaldo from "./modules/popUpBalance.js";
import heartToggle from "./modules/heartToggle.js";
import marginHeader from "./modules/marginHeader.js";
import depositSteps from "./modules/depositSteps.js";
import depositAmmount from "./modules/depositAmmount.js";

window.addEventListener("load", () => {
  heartToggle();
  popUpSaldo();
  marginHeader();
  depositSteps();
  depositAmmount();
});
