import { S as Splide } from './splide.esm-20cd2e1c.js';
import { c as carouselJackpot, a as carouselGrid, b as collapseGrid } from './collapseGridHalf-9249080c.js';
import { p as popUpSaldo, m as marginHeader } from './marginHeader-a6d4c25f.js';
import { g as gsapWithCSS } from './index-92880765.js';

function carouselBanner() {
  var carousel = new Splide(".bannerCarousel .splide", {
    perPage: 1,
    arrow: true,
    pagination: false,
  });

  carousel.mount();
}

function carouselBets() {
  var carousel = new Splide(".carouselBets__carousel", {
    pagination: false,
    arrows: true,
    perPage: 5,
    padding: 0,
    perMove: 1,
    gap: 10,
    breakpoints: {
      1900: {
        perPage: 4,
        padding: { left: 0, right: 50 },
      },
      1600: {
        perPage: 3,
        padding: { left: 0, right: 120 },
      },
      1280: {
        perPage: 3,
        padding: { left: 0, right: 50 },
      },
      1024: {
        perPage: 2,
        padding: { left: 0, right: 100 },
        arrows: false,
      },
      768: {
        perPage: 2,
        padding: { left: 0, right: 50 },
        arrows: false,
      },
      620: {
        perPage: 1,
        padding: { left: 0, right: 200 },
        arrows: false,
      },
      510: {
        perPage: 1,
        padding: { left: 0, right: 50 },
        arrows: false,
      },
    },
  });
  carousel.mount();
}

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

function depositAmmount() {
  const btnsArr20 = document.querySelectorAll(".btnAmmount__20");
  const btnsArr50 = document.querySelectorAll(".btnAmmount__50");
  const btnsArr100 = document.querySelectorAll(".btnAmmount__100");
  const inputAmmount = document.querySelector(".depositDetail__ammount");


  btnsArr20.forEach((btn20) => {
    btn20.addEventListener("click", () => {
        inputAmmount.value = 20;
      });
  });
  btnsArr50.forEach((btn50) => {
    btn50.addEventListener("click", () => {
        inputAmmount.value = 50;
      });
  });
  btnsArr100.forEach((btn100) => {
    btn100.addEventListener("click", () => {
        inputAmmount.value = 100;
      });
  });

}

window.addEventListener("load", () => {
  carouselBanner();
  carouselJackpot();
  carouselBets();
  carouselGrid();
  popUpSaldo();
  collapseGrid();
  marginHeader();
  depositSteps();
  depositAmmount();
});
//# sourceMappingURL=home.js.map
