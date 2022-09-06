import mixitup from 'mixitup';
import mixitupMultifilter from './mixitup-multifilter.js';

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
})

const resetBtn = document.getElementById("reset");

container.addEventListener("mixEnd", () => {
  const state = mixerRuleta.getState();
  if (state.totalShow < state.totalTargets) {
    resetBtn.classList.add("visible");
  } else {
    resetBtn.classList.remove("visible");
  }
});