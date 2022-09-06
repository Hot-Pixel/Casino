import mixitup from 'mixitup';
import mixitupMultifilter from './mixitup-multifilter.js';

mixitup.use(mixitupMultifilter);


const hearts = document.querySelectorAll(".gridGames__item-favourite");

hearts.forEach((heart) => {
  heart.addEventListener("click", () => {
    heart.classList.toggle("fav");
    if (heart.classList.contains("fav")) {
      heart.parentElement.classList.add("favorito");
    } else {
      heart.parentElement.classList.remove("favorito");
    }
  });
});

const container = document.querySelector(".casinoFinder");
var mixerCasino = mixitup( container, {
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


const totalHTML = document.querySelector('.is-showing span');
const state = mixerCasino.getState();
const total = state.totalShow;
totalHTML.innerHTML = total;

container.addEventListener('mixEnd', () => {
  const state = mixerCasino.getState();
  const total = state.totalShow;
  totalHTML.innerHTML = total;
})

const resetBtn = document.getElementById("reset");

container.addEventListener("mixEnd", () => {
  const state = mixerCasino.getState();
  if (state.totalShow < state.totalTargets) {
    resetBtn.classList.add("visible");
  } else {
    resetBtn.classList.remove("visible");
  }
});