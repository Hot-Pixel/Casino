<<<<<<< HEAD
import { p as popUpSaldo, m as marginHeader, d as depositSteps, a as depositAmmount, b as depositCopy, c as menuHeaderMobile, u as userMenuMobile } from './userMenuMobile-b6dfe5e6.js';
=======
import { p as popUpSaldo, m as marginHeader, d as depositSteps, a as depositAmmount, b as depositCopy, c as menuHeaderMobile, u as userMenuMobile } from './userMenuMobile-f069f291.js';
>>>>>>> dev

function heartToggle() {
  const heartBtn = document.querySelector(".heart");

  heartBtn.addEventListener("click", () => {
    heartBtn.classList.toggle("active");
  });
}

window.addEventListener("load", () => {
  heartToggle();
  popUpSaldo();
  marginHeader();
  depositSteps();
  depositAmmount();
  depositCopy();
  menuHeaderMobile();
  userMenuMobile();
});
//# sourceMappingURL=screens.js.map
