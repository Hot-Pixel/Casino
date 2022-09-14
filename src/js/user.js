import { gsap } from "gsap";

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

const menuMobileCollapse = document.querySelector(".userMenuMobile__collapse");
const menuMobileTab = document.querySelector(".userMenuMobile__tab");

menuMobileCollapse.addEventListener("click", () => {
  gsap.to(userMenuMobile, { right: "-80vw", opacity: 1, duration: 0.4 });
});

menuMobileTab.addEventListener("click", () => {
  gsap.to(userMenuMobile, { right: 0, opacity: 1, duration: 0.4 });
});

// const verifyBtn = document.querySelectorAll(".nav__btn > button");
// const docsBlock = document.querySelector(".docsBlock");
// const docsVerifyBlock = document.querySelector(".docsVerifyBlock");
// const docsVerifyBlock2 = document.querySelector(".docsVerifyBlock2");
// const docsArr = [docsBlock, docsVerifyBlock, docsVerifyBlock2];

// verifyBtn.forEach((btn) => {
//   btn.addEventListener("click", () => {
//     blockArr.forEach((block) => {
//       block.classList.remove("block-active");
//     });
//     docsArr.forEach((doc) => {
//       doc.classList.remove("block-active");
//     });
//     blockArr[1].classList.add("block-active");
//     docsVerifyBlock.classList.add("block-active");
//   });
// });

// const withdrawOpenBtn = document.querySelector(".wallet__btn-withdraw");
// const whitdrawBlock = document.querySelector(".whitdrawScreen");
// const withdrawCloseBtn = document.querySelector(".withdraw__btn-close");

// withdrawOpenBtn.addEventListener("click", () => {
//   whitdrawBlock.classList.add("block-active");
// });

// withdrawCloseBtn.addEventListener("click", () => {
//   whitdrawBlock.classList.remove("block-active");
// });

// const btnAmmountArr = document.querySelectorAll(".btnAmmount");
// const inputAmmount = document.querySelector(".depositDetail__ammount");

// btnAmmountArr[0].addEventListener('click', () => {
//   inputAmmount.value = 20;
// })
// btnAmmountArr[1].addEventListener('click', () => {
//   inputAmmount.value = 50;
// })
// btnAmmountArr[2].addEventListener('click', () => {
//   inputAmmount.value = 100;
// })