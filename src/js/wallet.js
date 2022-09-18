import popUpSaldo from "./modules/popUpBalance.js";
import marginHeader from "./modules/marginHeader.js";
import dataModify from "./modules/dataModify.js";
import depositSteps from "./modules/depositSteps.js";
import depositAmmount from "./modules/depositAmmount.js";

window.addEventListener('load', () => {
  popUpSaldo()
  marginHeader()
  dataModify()
  depositSteps()
  depositAmmount()
})

const withdrawOpenBtn = document.querySelector(".wallet__btn-withdraw");
const whitdrawBlock = document.querySelector(".withdrawScreen");
const withdrawCloseBtn = document.querySelector(".withdraw__btn-close");
console.log(whitdrawBlock)

withdrawOpenBtn.addEventListener("click", () => {
  whitdrawBlock.classList.add("block-active");
});

withdrawCloseBtn.addEventListener("click", () => {
  whitdrawBlock.classList.remove("block-active");
});