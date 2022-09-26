import { S as Splide } from './splide.esm-20cd2e1c.js';
import { a as accordion } from './accordion-072e9b15.js';
import { p as popUpSaldo, m as marginHeader, d as depositSteps, a as depositAmmount, b as depositCopy, c as menuHeaderMobile } from './menuHeaderMobile-013e6314.js';

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

window.addEventListener("load", () => {
  accordion();
  carouselPoker();
  menuPoker();
  popUpSaldo();
  marginHeader();
  depositSteps();
  depositAmmount();
  depositCopy();
  menuHeaderMobile();
});
//# sourceMappingURL=poker.js.map
