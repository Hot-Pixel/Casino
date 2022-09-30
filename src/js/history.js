import popUpSaldo from "./modules/popUpBalance.js";
import marginHeader from "./modules/marginHeader.js";
import historyNavBar from "./modules/historyNavBar.js";
import depositSteps from "./modules/depositSteps.js";
import depositAmmount from "./modules/depositAmmount.js";
import depositCopy from "./modules/depositCopy.js";
import menuHeaderMobile from "./modules/menuHeaderMobile.js";
import userMenuMobile from "./modules/userMenuMobile.js";

import { Splide } from "@splidejs/splide";
import flatpickr from "flatpickr";
import Spanish from "flatpickr/dist/esm/l10n/es.js"
import rangePlugin from "flatpickr/dist/esm/plugins/rangePlugin.js"

window.addEventListener('load', () => {
  popUpSaldo()
  marginHeader()
  historyNavBar()
  depositSteps();
  depositAmmount();
  depositCopy();
  menuHeaderMobile();
  userMenuMobile();
})

var carouselHistory = new Splide(".splide", {
  pagination: false,
  arrows: false,
  perPage: 2,
  padding: { left: 0, right: 80 },
  perMove: 1,
  drag: 'free'
});

carouselHistory.mount();

flatpickr('#startDate', {
  locale: Spanish,
  plugins: [ new rangePlugin({ input: "#endDate"}) ]
})
