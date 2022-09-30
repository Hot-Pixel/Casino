import popUpSaldo from "./modules/popUpBalance.js";
import marginHeader from "./modules/marginHeader.js";
import historyNavBar from "./modules/historyNavBar.js";
import depositSteps from "./modules/depositSteps.js";
import depositAmmount from "./modules/depositAmmount.js";
import depositCopy from "./modules/depositCopy.js";
import menuHeaderMobile from "./modules/menuHeaderMobile.js";
import userMenuMobile from "./modules/userMenuMobile.js";
import carouselMenuHistory from "./modules/carouselMenuHistory.js";
import calendarHistory from "./modules/calendarHistory.js";


marginHeader()

window.addEventListener('load', () => {
  popUpSaldo()
  historyNavBar()
  depositSteps()
  depositAmmount()
  depositCopy()
  menuHeaderMobile()
  userMenuMobile()
  carouselMenuHistory()
  calendarHistory()
})