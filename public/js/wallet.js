import { p as popUpSaldo, m as marginHeader, d as depositSteps, a as depositAmmount } from './depositAmmount-b6c0f84a.js';
import { d as dataModify } from './dataModify-9d8bbfff.js';

window.addEventListener('load', () => {
  popUpSaldo();
  marginHeader();
  dataModify();
  depositSteps();
  depositAmmount();
});

const withdrawOpenBtn = document.querySelector(".wallet__btn-withdraw");
const whitdrawBlock = document.querySelector(".withdrawScreen");
const withdrawCloseBtn = document.querySelector(".withdraw__btn-close");
console.log(whitdrawBlock);

withdrawOpenBtn.addEventListener("click", () => {
  whitdrawBlock.classList.add("block-active");
});

withdrawCloseBtn.addEventListener("click", () => {
  whitdrawBlock.classList.remove("block-active");
});
//# sourceMappingURL=wallet.js.map
