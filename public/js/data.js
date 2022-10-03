import { p as popUpSaldo, m as marginHeader, d as depositSteps, a as depositAmmount, b as depositCopy, c as menuHeaderMobile, u as userMenuMobile } from './userMenuMobile-06ed4418.js';

function dataModify() {
  const dataModifyOpen = document.querySelector(".data__modify-open");
  const dataModifyClose = document.querySelector(".data__modify-close");
  const dataBlock = document.querySelector(".dataBlock");
  const dataModifyBlock = document.querySelector(".dataModifyBlock");

  dataModifyOpen.addEventListener("click", () => {
    dataBlock.classList.remove("block-active");
    dataModifyBlock.classList.add("block-active");
  });

  dataModifyClose.addEventListener("click", () => {
    dataBlock.classList.add("block-active");
    dataModifyBlock.classList.remove("block-active");
  });
}

window.addEventListener('load', () => {
  popUpSaldo();
  marginHeader();
  dataModify();
  depositSteps();
  depositAmmount();
  depositCopy();
  menuHeaderMobile();
  userMenuMobile();
});
//# sourceMappingURL=data.js.map
