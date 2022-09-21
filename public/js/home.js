import { S as Splide } from './splide.esm-20cd2e1c.js';
import { c as carouselJackpot, a as carouselGrid, b as collapseGrid } from './collapseGridHalf-c89dac96.js';
import { p as popUpSaldo, m as marginHeader, d as depositSteps, a as depositAmmount } from './depositAmmount-a098a8a3.js';

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
