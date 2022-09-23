import { p as popUpSaldo, m as marginHeader, d as depositSteps, a as depositAmmount, b as depositCopy } from './depositCopy-f41c5281.js';

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
});
//# sourceMappingURL=screens.js.map
