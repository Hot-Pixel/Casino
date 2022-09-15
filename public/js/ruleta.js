import { m as mixitup } from './mixitup-b8d39d7d.js';
import { m as mixitupMultifilter } from './mixitup-multifilter-2ac2620b.js';

mixitup.use(mixitupMultifilter);

const hearts = document.querySelectorAll(".card__content-heart");

hearts.forEach((heart) => {
  heart.addEventListener("click", () => {
    heart.classList.toggle("fav");
    if (heart.classList.contains("fav")) {
      heart.parentElement.parentElement.parentElement.classList.add("favorito");
    } else {
      heart.parentElement.parentElement.parentElement.classList.remove("favorito");
    }
  });
});

var mixerRuleta = mixitup(".ruletaFinder", {
  multifilter: {
    enable: true,
  },
  controls: {
    enable: true,
  },
  animation: {
    enable: false,
  },
});

const container = document.querySelector(".ruletaFinder");
const totalHTML = document.querySelector('.is-showing span');
const state = mixerRuleta.getState();
const total = state.totalShow;
totalHTML.innerHTML = total;

container.addEventListener('mixEnd', () => {
  const state = mixerRuleta.getState();
  const total = state.totalShow;
  totalHTML.innerHTML = total;
});

const resetBtn = document.getElementById("reset");

container.addEventListener("mixEnd", () => {
  const state = mixerRuleta.getState();
  if (state.totalShow < state.totalTargets) {
    resetBtn.classList.add("visible");
  } else {
    resetBtn.classList.remove("visible");
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
//# sourceMappingURL=ruleta.js.map
