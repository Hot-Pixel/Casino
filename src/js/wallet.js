import popUpSaldo from "./modules/popUpBalance.js";
import marginHeader from "./modules/marginHeader.js";
import depositSteps from "./modules/depositSteps.js";
import depositAmmount from "./modules/depositAmmount.js";

import { gsap } from "gsap";

window.addEventListener('load', () => {
  popUpSaldo()
  marginHeader()
  depositSteps()
  depositAmmount()
})

const withdrawOpenBtn = document.querySelector(".wallet__btn-withdraw");
const whithdrawScreen = document.querySelector(".withdrawScreen");
const whithdrawBlocks = document.querySelectorAll(".withdraw__block");
const whithdrawStep1 = document.querySelector(".withdraw__step1");
const withdrawCloseBtn = document.querySelector(".withdraw__btn-close");
const pageContainer = document.querySelector('.pageContainer');
console.log(whithdrawStep1)

withdrawOpenBtn.addEventListener("click", () => {
  whithdrawBlocks.forEach((block) => {
    block.classList.remove("active");
  });
  whithdrawStep1.classList.add("active");
  gsap
    .timeline()
    .to(pageContainer, { display: "none", duration: 0 })
    .to(whithdrawScreen, { display: "block", duration: 0 })
    .to(whithdrawScreen, { opacity: 1, duration: 0.4 });
});


withdrawCloseBtn.addEventListener("click", () => {
  gsap
    .timeline()
    .to(pageContainer, { display: "block", duration: 0 })
    .to(whithdrawScreen, { opacity: 0, duration: 0.2 })
    .to(whithdrawScreen, { display: "none", duration: 0 });
});

// depositMethodsBtn.forEach((methodBtn) => {
//   methodBtn.addEventListener("click", (e) => {
//     depositBlocks.forEach((block) => {
//       block.classList.remove("active");
//     });
//     depositStep2.classList.add("active");

//     depositMethods.forEach((method) => {
//       method.classList.remove("active");
//     });
//     const target = document.querySelector(
//       `.${e.currentTarget.dataset.method}`
//     );
//     target.classList.add("active");
//   });
// });

// step2BackBtn.forEach((btn) => {
//   btn.addEventListener("click", () => {
//     depositMethods.forEach((method) => {
//       method.classList.remove("active");
//     });
//     depositBlocks.forEach((block) => {
//       block.classList.remove("active");
//     });
//     depositStep1.classList.add("active");
//     return false;
//   });
// });

// step3Btn.forEach((btn) => {
//   btn.addEventListener("click", () => {
//     depositMethods.forEach((method) => {
//       method.classList.remove("active");
//     });
//     depositBlocks.forEach((block) => {
//       block.classList.remove("active");
//     });
//     depositStep3.classList.add("active");
//     return false;
//   });
// });