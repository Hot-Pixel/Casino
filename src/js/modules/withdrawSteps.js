import { gsap } from "gsap";

function withdrawSteps() {
  const withdrawOpenBtn = document.querySelector(".wallet__btn-withdraw");
  const whithdrawScreen = document.querySelector(".withdrawScreen");
  const whithdrawBlocks = document.querySelectorAll(".withdraw__block");
  const whithdrawStep1 = document.querySelector(".withdraw__step1");
  const whithdrawStep2 = document.querySelector(".withdraw__step2");
  const whithdrawStep3 = document.querySelector(".withdraw__step3");
  const withdrawCloseBtn = document.querySelector(".withdraw__btn-close");
  const withdrawMethodBtns = document.querySelectorAll(".withdraw__item");
  const withdrawMethods = document.querySelectorAll(".withdraw__step2-methods");
  const pageContainer = document.querySelector(".pageContainer");
  const step2BackBtn = document.querySelectorAll(".withdraw__step2BackBtn");
  const step3Btn = document.querySelectorAll(".withdraw__step3Btn");
  console.log(whithdrawStep1);

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

  withdrawMethodBtns.forEach((methodBtn) => {
    methodBtn.addEventListener("click", (e) => {
      console.log(e.currentTarget);
      whithdrawBlocks.forEach((block) => {
        block.classList.remove("active");
      });
      whithdrawStep2.classList.add("active");

      withdrawMethods.forEach((method) => {
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
      withdrawMethods.forEach((method) => {
        method.classList.remove("active");
      });
      whithdrawBlocks.forEach((block) => {
        block.classList.remove("active");
      });
      whithdrawStep1.classList.add("active");
    });
  });

  step3Btn.forEach((btn) => {
    btn.addEventListener("click", () => {
      withdrawMethods.forEach((method) => {
        method.classList.remove("active");
      });
      whithdrawBlocks.forEach((block) => {
        block.classList.remove("active");
      });
      whithdrawStep3.classList.add("active");
    });
  });
}

export default withdrawSteps;
