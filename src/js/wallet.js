import popUpSaldo from "./modules/popUpBalance.js";
import marginHeader from "./modules/marginHeader.js";
import depositSteps from "./modules/depositSteps.js";
import depositAmmount from "./modules/depositAmmount.js";
import withdrawSteps from "./modules/withdrawSteps.js";
import depositCopy from "./modules/depositCopy.js";
import menuHeaderMobile from "./modules/menuHeaderMobile.js";
import userMenuMobile from "./modules/userMenuMobile.js";
import loading from "./modules/loading.js";

loading()
marginHeader();

window.addEventListener("load", () => {
  popUpSaldo();
  depositSteps();
  depositAmmount();
  depositCopy();
  withdrawSteps();
  menuHeaderMobile();
  userMenuMobile();
});

