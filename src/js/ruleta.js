import popUpSaldo from "./modules/popUpBalance.js";
import marginHeader from "./modules/marginHeader.js";
import favHeart from "./modules/favHeart.js";
import filterWheel from "./modules/filterWheel.js";
import depositSteps from "./modules/depositSteps.js";
import depositAmmount from "./modules/depositAmmount.js";
import depositCopy from "./modules/depositCopy.js";
import menuHeaderMobile from "./modules/menuHeaderMobile.js";
import userMenuMobile from "./modules/userMenuMobile.js";
import LiveRoulette from "./modules/liveRoulette.js";

window.addEventListener('load', () => {
  popUpSaldo()
  marginHeader()
  favHeart()
  depositSteps()
  depositAmmount()
  filterWheel()
  depositCopy();
  menuHeaderMobile();
  userMenuMobile()
  LiveRoulette();
})