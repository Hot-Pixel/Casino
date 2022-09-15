import { S as Splide } from './splide.esm-20cd2e1c.js';
import { m as mixitup } from './mixitup-b8d39d7d.js';

const container = document.querySelector(".finder__promo");

mixitup( container, {
  controls: {
    enable: true,
  },
  animation: {
    enable: false,
  },
});

var carouselMenuPromo = new Splide(".filter__promo .splide", {
  pagination: false,
  arrows: false,
  perPage: 3,
  padding: { left: 0, right: 30 },
  perMove: 1,
  gap: 5,
});
carouselMenuPromo.mount();

var carouselPromo = new Splide(".carouselPromo__slider", {
  arrows: true,
  pagination: false,
  perPage: 3,
  perMove: 1,
  breakpoints: {
    1280: {
      perPage: 2,
    },
    768: {
      perPage: 1,
    }
  }
});
carouselPromo.mount();

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
//# sourceMappingURL=promociones.js.map
