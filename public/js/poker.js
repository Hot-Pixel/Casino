import { S as Splide } from './splide.esm-20cd2e1c.js';
import { g as gsapWithCSS } from './index-92880765.js';

function menuPoker() {
  const menuBtns = document.querySelectorAll(".menuPoker__btn");
  menuBtns.forEach((btn) => {

    btn.addEventListener("click", (e) => {

      menuBtns.forEach((btn) => {
        btn.classList.remove("is-active");
      });

      e.currentTarget.classList.toggle("is-active");

      const pokerSect = document.querySelectorAll(".poker__section");
      pokerSect.forEach( sect => {
        sect.classList.remove("tab-on");
      });

      if(e.currentTarget.classList.contains("menuPoker-home")) {
        const homeSect = document.querySelector(".poker__home");
        homeSect.classList.add("tab-on");
      } else if(e.currentTarget.classList.contains("menuPoker-pc")) {
        const pcSect = document.querySelector(".poker__pc");
        pcSect.classList.add("tab-on");
      } else if(e.currentTarget.classList.contains("menuPoker-mobile")) {
        const mobileSect = document.querySelector(".poker__mobile");
        mobileSect.classList.add("tab-on");
      } else if(e.currentTarget.classList.contains("menuPoker-tour")) {
        const tourSect = document.querySelector(".poker__tour");
        tourSect.classList.add("tab-on");
      }

    });


  });
}

function carouselPoker() {

    var carousel = new Splide(".menuPoker .splide", {
        pagination: false,
        arrows: false,
        perPage: 4,
        padding: { left: 0, right: 100 },
        perMove: 1,
        breakpoints: {
        768: {
            perPage: 3,
        },
        576: {
            perPage: 2,
        }
        }
    });

    carousel.mount();
}

function accordion() {
    const accorArrows = document.getElementsByClassName("accorArrow");
    const accorBody = document.getElementsByClassName("body");

    for (let n = 0; n < accorArrows.length; n++) {
      accorArrows[n].addEventListener("click", () => {
        if (accorBody[n].classList.contains("active")) {
          gsapWithCSS
            .timeline()
            .to(accorArrows[n], { rotation: -90, duration: 0.3 })
            .to(accorBody[n], { opacity: 0, duration: 0.3 })
            .to(accorBody[n], { height: 0, padding:0, duration: 0.3 });
          accorBody[n].classList.remove("active");
        } else {
          gsapWithCSS
            .timeline()
            .to(accorArrows[n], { rotation: 0, duration: 0.3 })
            .to(accorBody[n], { height: "auto", padding: 15, duration: 0.3 })
            .to(accorBody[n], { opacity: 1, duration: 0.3 });
          accorBody[n].classList.add("active");
        }
      });
    }
  }

const menuPokerExist = document.getElementsByClassName("menuPoker");

window.addEventListener("load", () => {
  if (menuPokerExist.length > 0) {
    accordion();
    carouselPoker();
    menuPoker();
  }
});

const popUpCloseBtn = document.querySelector('.popUpBalance__closeBtn');
const popUpOpenBtn = document.querySelector('.popUpBalance__openBtn');
const popUpMenu = document.querySelector('.popUpBalance');

popUpOpenBtn.addEventListener('click', () => {
  popUpMenu.style.display = 'block';
});

popUpCloseBtn.addEventListener('click', () => {
  popUpMenu.style.display = 'none';
});

const menuHeaderOpenBtn = document.querySelector(".menuHeader__openBtn");
const menuHeaderCloseBtn = document.querySelector(".menuHeader__closeBtn");
const menuHeader = document.querySelector(".menuHeader");

menuHeaderOpenBtn.addEventListener("click", () => {
  menuHeader.style.display = "flex";
});
menuHeaderCloseBtn.addEventListener("click", () => {
  menuHeader.style.display = "none";
});
//# sourceMappingURL=poker.js.map
