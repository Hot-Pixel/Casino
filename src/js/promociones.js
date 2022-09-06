import { Splide } from "@splidejs/splide";
import mixitup from 'mixitup';

const container = document.querySelector(".finder__promo")

var mixerPromo = mixitup( container, {
  controls: {
    enable: true,
  },
  animation: {
    enable: false,
  },
});

var carouselPromo = new Splide(".filter__promo .splide", {
  pagination: false,
  arrows: false,
  perPage: 3,
  padding: { left: 0, right: 30 },
  perMove: 1,
  gap: 5,
});
carouselPromo.mount();

const popUpCloseBtn = document.querySelector('.popUpBalance__closeBtn');
const popUpOpenBtn = document.querySelector('.popUpBalance__openBtn');
const popUpMenu = document.querySelector('.popUpBalance');

popUpOpenBtn.addEventListener('click', () => {
  popUpMenu.style.display = 'block';
})

popUpCloseBtn.addEventListener('click', () => {
  popUpMenu.style.display = 'none';
})

const menuHeaderOpenBtn = document.querySelector(".menuHeader__openBtn");
const menuHeaderCloseBtn = document.querySelector(".menuHeader__closeBtn");
const menuHeader = document.querySelector(".menuHeader");

menuHeaderOpenBtn.addEventListener("click", () => {
  menuHeader.style.display = "flex";
});
menuHeaderCloseBtn.addEventListener("click", () => {
  menuHeader.style.display = "none";
});