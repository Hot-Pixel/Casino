import { m as marginHeader, p as popUpSaldo, d as depositSteps, a as depositAmmount, b as depositCopy, c as menuHeaderMobile, u as userMenuMobile } from './userMenuMobile-e0dcc8dc.js';
import { h as historyNavBar } from './historyNavBar-c56d1d21.js';
import { l as loading } from './loading-2da3e22c.js';

loading();
marginHeader();

window.addEventListener('load', () => {
  popUpSaldo();
  historyNavBar();
  depositSteps();
  depositAmmount();
  depositCopy();
  menuHeaderMobile();
  userMenuMobile();
});
//# sourceMappingURL=preferences.js.map
