import { S as Splide } from './splide.esm-20cd2e1c.js';
<<<<<<< HEAD
import { a as accordion } from './accordion-c7fbb94d.js';
import { p as popUpSaldo, m as marginHeader, d as depositSteps, a as depositAmmount, b as depositCopy, c as menuHeaderMobile, u as userMenuMobile } from './userMenuMobile-b6dfe5e6.js';
=======
import { a as accordion } from './accordion-9e03b00f.js';
import { p as popUpSaldo, m as marginHeader, d as depositSteps, a as depositAmmount, b as depositCopy, c as menuHeaderMobile, u as userMenuMobile } from './userMenuMobile-f069f291.js';
>>>>>>> dev

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
  userMenuMobile();
});
//# sourceMappingURL=poker.js.map
