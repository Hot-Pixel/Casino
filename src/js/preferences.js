import popUpSaldo from "./modules/popUpBalance.js";
import marginHeader from "./modules/marginHeader.js";
import historyNavBar from "./modules/historyNavBar.js";
import depositSteps from "./modules/depositSteps.js";
import depositAmmount from "./modules/depositAmmount.js";
import depositCopy from "./modules/depositCopy.js";
import menuHeaderMobile from "./modules/menuHeaderMobile.js";
import userMenuMobile from "./modules/userMenuMobile.js";
import loading from "./modules/loading.js";

loading()
marginHeader();

window.addEventListener('load', () => {
  popUpSaldo()
  historyNavBar()
  depositSteps();
  depositAmmount();
  depositCopy();
  menuHeaderMobile();
  userMenuMobile();
})