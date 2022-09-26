import popUpSaldo from "./modules/popUpBalance.js";
import marginHeader from "./modules/marginHeader.js";
import depositSteps from "./modules/depositSteps.js";
import depositAmmount from "./modules/depositAmmount.js";
import withdrawSteps from "./modules/withdrawSteps.js";
import depositCopy from "./modules/depositCopy.js";
import menuHeaderMobile from "./modules/menuHeaderMobile.js";

window.addEventListener("load", () => {
  marginHeader();
  popUpSaldo();
  depositSteps();
  depositAmmount();
  depositCopy();
  withdrawSteps();
  menuHeaderMobile();
});

