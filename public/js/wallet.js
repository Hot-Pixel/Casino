import { p as popUpSaldo, m as marginHeader } from './marginHeader-a6d4c25f.js';
import { d as dataModify } from './dataModify-9d8bbfff.js';
import './index-92880765.js';

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

window.addEventListener('load', () => {
  popUpSaldo();
  marginHeader();
  dataModify();
});
//# sourceMappingURL=wallet.js.map
