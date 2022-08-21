import { m as menuPoker } from './menuPoker-eba55fa5.js';
import { S as Splide } from './splide.esm-20cd2e1c.js';
import { g as gsapWithCSS } from './index-92880765.js';

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
    menuPoker();
    accordion();
    carouselPoker();
  }
});
//# sourceMappingURL=poker.js.map
