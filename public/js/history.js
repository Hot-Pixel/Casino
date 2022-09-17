import { p as popUpSaldo, m as marginHeader } from './marginHeader-a6d4c25f.js';
import { d as dataModify } from './dataModify-9d8bbfff.js';
import './index-92880765.js';

function historyNavBar() {
  const historyNav = document.querySelectorAll(".history__nav");
  const historyBlock = document.querySelectorAll(".block");

  historyNav.forEach((nav) => {
    nav.addEventListener("click", (e) => {
      historyBlock.forEach((block) => {
        block.classList.remove("active-block");
      });
      historyNav.forEach((nav) => {
        nav.classList.remove("is-active");
      });
      e.currentTarget.classList.add("is-active");
      let dataBlock = e.currentTarget.dataset.block;
      console.log(dataBlock);
      let target = document.querySelector(dataBlock);
      target.classList.add("active-block");
    });
  });
}

window.addEventListener('load', () => {
  popUpSaldo();
  marginHeader();
  dataModify();
  historyNavBar();
});
//# sourceMappingURL=history.js.map
