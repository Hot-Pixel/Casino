(function () {
  'use strict';

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

<<<<<<< Updated upstream
  document.addEventListener('DOMContentLoaded', () => {
=======
  function depositSteps() {
    const depositScreen = document.querySelector(".depositScreen");
    const pageContainer = document.querySelector(".pageContainer");
    const depositBlocks = document.querySelectorAll(".deposit__block");
    const depositCloseBtn = document.querySelector(".deposit__btn-close");
    const depositOpenBtns = document.querySelectorAll(".deposit__openBtn");
    const depositStep1 = document.querySelector(".deposit__step1");
    const depositMethodsBtn = document.querySelectorAll(".deposit__item");
    const depositMethods = document.querySelectorAll(".deposit__step2-method");
    const depositStep2 = document.querySelector(".deposit__step2");
    const depositStep3 = document.querySelector(".deposit__step3");
    const step2BackBtn = document.querySelectorAll(".depositStep2__backBtn");
    const step3Btn = document.querySelectorAll(".depositStep3__Btn");
    
    if(!depositScreen) return;
    
    depositOpenBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
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

    step3Btn.forEach((btn) => {
      btn.addEventListener("click", () => {
        depositMethods.forEach((method) => {
          method.classList.remove("active");
        });
        depositBlocks.forEach((block) => {
          block.classList.remove("active");
        });
        depositStep3.classList.add("active");
        return false;
      });
    });
  }

  function depositAmmount() {
    const btnsArr20 = document.querySelectorAll(".btnAmmount__20");
    const btnsArr50 = document.querySelectorAll(".btnAmmount__50");
    const btnsArr100 = document.querySelectorAll(".btnAmmount__100");


    btnsArr20.forEach((btn20) => {
      btn20.addEventListener("click", (e) => {
        console.log(e.currentTarget);
          let input = document.querySelector(e.currentTarget.dataset.input);
          input.value = 20;
        });
    });
    btnsArr50.forEach((btn50) => {
      btn50.addEventListener("click", (e) => {
        let input = document.querySelector(e.currentTarget.dataset.input);
        input.value = 50;
        });
    });
    btnsArr100.forEach((btn100) => {
      btn100.addEventListener("click", (e) => {
        let input = document.querySelector(e.currentTarget.dataset.input);
        input.value = 100;
        });
    });

  }

  function depositCopy() {
    const iban = document.querySelector("#iban");
    const copyBtn = document.querySelector(".depositTransfer__table-copy");
    
    if(!copyBtn) return;

    copyBtn.addEventListener("click", () => {
      gsapWithCSS
        .timeline()
        .to(copyBtn, { scale: 0.9, duration: 0.2 })
        .to(copyBtn, { scale: 1, duration: 0.2 });

      navigator.clipboard.writeText(iban.innerText);
    });
  }

  const menuHeaderOpenBtn = document.querySelector(".menuHeader__openBtn");
  const menuHeaderCloseBtn = document.querySelector(".menuHeader__closeBtn");
  const menuHeader = document.querySelector(".menuHeader");

  function menuHeaderMobile() {
    menuHeaderOpenBtn.addEventListener("click", () => {
      menuHeader.style.display = "flex";
      gsapWithCSS.to(menuHeader, { left: "0", opacity: 1, duration: 0.7 });
    });

    menuHeaderCloseBtn.addEventListener("click", () => {
      gsapWithCSS
        .to(menuHeader, { left: "-90vw", opacity: 0, duration: 0.3 })
        .to(menuHeader, { display: "none", duration: 0 });
    });
  }

  function userMenuMobile() {
    const userMenuMobileOpen = document.querySelector(".userMenuMobile__open");
    const userMenuMobileClose = document.querySelector(
      ".userMenuMobile__collapse"
    );
    const userMenuMobile = document.querySelector(".userMenuMobile");

    if(!userMenuMobile) return;

    userMenuMobileOpen.addEventListener("click", e => {
      e.preventDefault();
      userMenuMobile.style.display = "flex";
      gsapWithCSS.to(userMenuMobile, { right: "0", opacity: 1, duration: 0.7 });
    });

    userMenuMobileClose.addEventListener("click", () => {
      gsapWithCSS
        .to(userMenuMobile, { right: "-90vw", opacity: 0, duration: 0.3 })
        .to(userMenuMobile, { display: "none", duration: 0 });
    });
  }

  function loading() {
      document.addEventListener("readystatechange", (event) => {
          if (event.target.readyState === "complete") {
            gsapWithCSS
              .timeline()
              .to(".userMenu", { opacity: 1, duration: 0.2 })
              .to(".userContent", { opacity: 1, duration: 0.2 }, "<");
          }
        });
  }

  loading();
  marginHeader();

  window.addEventListener('load', () => {
    popUpSaldo();
>>>>>>> Stashed changes
    historyNavBar();
  });

})();
