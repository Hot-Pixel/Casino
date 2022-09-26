import popUpSaldo from "./modules/popUpBalance.js";
import marginHeader from "./modules/marginHeader.js";
import historyNavBar from "./modules/historyNavBar.js";
import depositSteps from "./modules/depositSteps.js";
import depositAmmount from "./modules/depositAmmount.js";
import depositCopy from "./modules/depositCopy.js";
import menuHeaderMobile from "./modules/menuHeaderMobile.js";

window.addEventListener('load', () => {
  popUpSaldo()
  marginHeader()
  historyNavBar()
  depositSteps();
  depositAmmount();
  depositCopy();
  menuHeaderMobile();
})