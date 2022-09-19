import { gsap } from "gsap";

const depositScreen = document.querySelector(".depositScreen");
const pageContainer = document.querySelector(".pageContainer");
const depositBlocks = document.querySelectorAll(".deposit__block");
const depositCloseBtn = document.querySelector(".deposit__btn-close");
const depositOpenBtn = document.querySelector(".deposit__openBtn");
const depositStep1 = document.querySelector(".deposit__step1");
const depositMethodsBtn = document.querySelectorAll(".deposit__item");
const depositMethods = document.querySelectorAll(".deposit__step2-method");
const depositStep2 = document.querySelector(".deposit__step2");
const step2BackBtn = document.querySelectorAll(".depositStep2__backBtn");

function depositSteps() {
  depositOpenBtn.addEventListener("click", () => {
    depositBlocks.forEach((block) => {
      block.classList.remove("active");
    });
    depositStep1.classList.add("active");
    gsap
      .timeline()
      .to(pageContainer, { display: "none", duration: 0 })
      .to(depositScreen, { display: "block", duration: 0 })
      .to(depositScreen, { opacity: 1, duration: 0.4 });
  });

  depositCloseBtn.addEventListener("click", () => {
    gsap
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

  step2BackBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      depositMethods.forEach((method) => {
        method.classList.remove("active");
      });
      depositBlocks.forEach((block) => {
        block.classList.remove("active");
      });
      depositStep1.classList.add("active");
      return false;
    });
  });

  step2BackBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      depositMethods.forEach((method) => {
        method.classList.remove("active");
      });
      depositBlocks.forEach((block) => {
        block.classList.remove("active");
      });
      depositStep1.classList.add("active");
    });
  });
}

export default depositSteps;
