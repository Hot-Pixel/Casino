import { g as gsapWithCSS } from './index-92880765.js';

const depositScreen = document.querySelector(".depositScreen");
const pageContainer = document.querySelector(".pageContainer");
const depositBlocks = document.querySelectorAll(".deposit__block");
const depositCloseBtn = document.querySelector(".deposit__btn-close");
const depositOpenBtn = document.querySelector(".deposit__openBtn");
const depositStep1 = document.querySelector(".deposit__step1");
const depositMethodsBtn = document.querySelectorAll(".deposit__item");
const depositMethods = document.querySelectorAll(".deposit__step2-method");
const depositStep2 = document.querySelector(".deposit__step2");

function depositSteps() {
  depositOpenBtn.addEventListener("click", () => {
    depositBlocks.forEach((block) => {
      block.classList.remove("active");
    });
    depositStep1.classList.add("active");
    gsapWithCSS
      .timeline()
      .to(pageContainer, { display: "none", duration: 0 })
      .to(depositScreen, { display: "block", duration: 0 })
      .to(depositScreen, { opacity: 1, duration: 0.4 });
  });

  depositCloseBtn.addEventListener("click", () => {
    gsapWithCSS
      .timeline()
      .to(pageContainer, { display: "block", duration: 0 })
      .to(depositScreen, { opacity: 0, duration: 0.2 })
      .to(depositScreen, { display: "none", duration: 0 });
  });

  depositMethodsBtn.forEach((methodBtn) => {
    methodBtn.addEventListener("click", (e) => {
      depositBlocks.forEach((block) => {
        block.classList.remove("active");
      });
      depositStep2.classList.add("active");

      depositMethods.forEach((method) => {
        method.classList.remove("active");
      });
      const target = document.querySelector(
        `.${e.currentTarget.dataset.method}`
      );
      target.classList.add("active");
    });
  });
}

export { depositSteps as d };
//# sourceMappingURL=depositSteps-7b185133.js.map
