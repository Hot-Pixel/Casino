import { gsap } from "gsap";

const userBtn = document.querySelector(".user");
const userBtnMobile = document.querySelector(".userMobile");
const header = document.querySelector("header.header");
const userScreen = document.querySelector(".userScreen");
const userMenu = document.querySelector(".userMenu");
const userMenuMobile = document.querySelector(".userMenuMobile");

if (window.innerWidth < 1280) {
  userBtnMobile.addEventListener("click", () => {
    header.classList.toggle("header--light");
    userScreen.classList.toggle("user-on");
    if (userScreen.classList.contains("user-on")) {
      gsap
        .timeline()
        .to(userScreen, { opacity: 1, duration: 0.4 })
        .to(userMenuMobile, { right: 0, opacity: 1, duration: 0.4 });
    } else {
      gsap
        .timeline()
        .to(userMenuMobile, { right: "-90vw", opacity: 0, duration: 0.4 })
        .to(userScreen, { opacity: 0, duration: 0.4 });
    }
  });
} else {
  userBtn.addEventListener("click", () => {
    header.classList.toggle("header--light");
    userScreen.classList.toggle("user-on");
    if (userScreen.classList.contains("user-on")) {
      gsap
        .timeline()
        .to(userScreen, { opacity: 1, duration: 0.4 })
        .to(userMenu, { left: 0, opacity: 1, duration: 0.4 });
    } else {
      gsap
        .timeline()
        .to(userMenu, { left: "-20%", opacity: 0, duration: 0.4 })
        .to(userScreen, { opacity: 0, duration: 0.4 });
    }
  });
}

const navMobileArr = document.querySelectorAll(".userMenuMobile .nav__item");
const navArr = document.querySelectorAll(".userMenu .nav__item");
const blockArr = document.querySelectorAll(".userContent__block");

if (window.innerWidth < 1280) {
  //Loop Menu Desktop
  for (let i = 0; i < navMobileArr.length; i++) {
    navMobileArr[i].addEventListener("click", () => {
      blockArr.forEach((block) => {
        block.classList.remove("block-active");
      });
      blockArr[i].classList.add("block-active");

      navMobileArr.forEach((nav) => {
        nav.classList.remove("nav-active");
      });
      navMobileArr[i].classList.add("nav-active");
    });
  }
} else {
  //Loop Menu Desktop
  for (let i = 0; i < navArr.length; i++) {
    navArr[i].addEventListener("click", () => {
      blockArr.forEach((block) => {
        block.classList.remove("block-active");
      });
      blockArr[i].classList.add("block-active");

      navArr.forEach((nav) => {
        nav.classList.remove("nav-active");
      });
      navArr[i].classList.add("nav-active");
    });
  }
}

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

const verifyBtn = document.querySelectorAll(".nav__btn > button");
const docsBlock = document.querySelector(".docsBlock");
const docsVerifyBlock = document.querySelector(".docsVerifyBlock");
const docsVerifyBlock2 = document.querySelector(".docsVerifyBlock2");
const docsArr = [docsBlock, docsVerifyBlock, docsVerifyBlock2];

verifyBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    blockArr.forEach((block) => {
      block.classList.remove("block-active");
    });
    docsArr.forEach((doc) => {
      doc.classList.remove("block-active");
    });
    blockArr[1].classList.add("block-active");
    docsVerifyBlock.classList.add("block-active");
  });
});

const withdrawOpenBtn = document.querySelector(".wallet__btn-withdraw");
const whitdrawBlock = document.querySelector(".whitdrawScreen");
const withdrawCloseBtn = document.querySelector(".withdraw__btn-close");

withdrawOpenBtn.addEventListener("click", () => {
  whitdrawBlock.classList.add("block-active");
});

withdrawCloseBtn.addEventListener("click", () => {
  whitdrawBlock.classList.remove("block-active");
});

const btnAmmountArr = document.querySelectorAll(".btnAmmount");
const inputAmmount = document.querySelector(".depositDetail__ammount");

btnAmmountArr[0].addEventListener('click', () => {
  inputAmmount.value = 20;
})
btnAmmountArr[1].addEventListener('click', () => {
  inputAmmount.value = 50;
})
btnAmmountArr[2].addEventListener('click', () => {
  inputAmmount.value = 100;
})