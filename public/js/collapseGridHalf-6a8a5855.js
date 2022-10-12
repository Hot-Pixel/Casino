import { S as Splide } from './splide.esm-20cd2e1c.js';
import { g as gsapWithCSS } from './menuHeaderMobile-013e6314.js';

function carouselJackpot() {
  var carouselJackpot = new Splide(".jackpot__carousel", {
    pagination: false,
    arrows: true,
    perPage: 4,
    perMove: 1,
    gap: 10,
    breakpoints: {
      1600: {
        perPage: 3,
      },
      1200: {
        perPage: 2,
        arrows: false,
      },
    },
  });
  carouselJackpot.mount();
}

const arrowArr = document.getElementsByClassName("js-arrow__grid");
const gridArr = document.getElementsByClassName("gridHalf__grid");
const gridNodes = document.querySelectorAll("gridHalf__grid");

function collapseGrid() {

  if (window.innerWidth < 1280) {
    gridNodes.forEach( e => {
      e.classList.remove('active');
    });
    for (let n = 0; n < arrowArr.length; n++) {
      arrowArr[n].addEventListener("click", () => {
        if (gridArr[n].classList.contains("active")) {
          gsapWithCSS
            .timeline()
            .to(arrowArr[n], { rotation: -90, duration: 0.3 })
            .to(gridArr[n], { opacity: 0, duration: 0.6 })
            .to(gridArr[n], { height: 0, duration: 0.3 });
          gridArr[n].classList.remove("active");
        } else {
          gsapWithCSS
            .timeline()
            .to(arrowArr[n], { rotation: 0, duration: 0.3 })
            .to(gridArr[n], { height: "auto", duration: 0.3 })
            .to(gridArr[n], { opacity: 1, duration: 0.6 });
          gridArr[n].classList.add("active");
        }
      });
    }
  } else {
    for (let n = 0; n < arrowArr.length; n++) {
      arrowArr[n].addEventListener("click", () => {
        if (gridArr[n].classList.contains("active")) {
          gsapWithCSS
            .timeline()
            .to(arrowArr[n], { rotation: -90, duration: 0.3 })
            .to(gridArr[n], { opacity: 0, duration: 0.6 })
            .to(gridArr[n], { height: 0, duration: 0.3 });
          gridArr[n].classList.remove("active");
        } else {
          gsapWithCSS
            .timeline()
            .to(arrowArr[n], { rotation: 0, duration: 0.3 })
            .to(gridArr[n], { height: "auto", duration: 0.3 })
            .to(gridArr[n], { opacity: 1, duration: 0.6 });
          gridArr[n].classList.add("active");
        }
      });
    }
  }
}

export { collapseGrid as a, carouselJackpot as c };
//# sourceMappingURL=collapseGridHalf-6a8a5855.js.map
