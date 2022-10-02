import { m as mixitup } from './mixitup-b8d39d7d.js';
import { m as mixitupMultifilter } from './mixitup-multifilter-5efd6c76.js';
import { p as popUpSaldo, m as marginHeader, d as depositSteps, a as depositAmmount, b as depositCopy, c as menuHeaderMobile, u as userMenuMobile } from './userMenuMobile-a6c3447c.js';

mixitup.use(mixitupMultifilter);

function filterCasino() {
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
  var mixerCasino = mixitup(container, {
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

  const totalHTML = document.querySelector(".is-showing span");
  const state = mixerCasino.getState();
  const total = state.totalShow;
  totalHTML.innerHTML = total;

  container.addEventListener("mixEnd", () => {
    const state = mixerCasino.getState();
    const total = state.totalShow;
    totalHTML.innerHTML = total;
  });

  const resetBtn = document.getElementById("reset");

  container.addEventListener("mixEnd", () => {
    const state = mixerCasino.getState();
    if (state.totalShow < state.totalTargets) {
      resetBtn.classList.add("visible");
    } else {
      resetBtn.classList.remove("visible");
    }
  });
}

window.addEventListener('load', () => {
  filterCasino();
  popUpSaldo();
  marginHeader();
  depositSteps();
  depositAmmount();
  depositCopy();
  menuHeaderMobile();
  userMenuMobile();
});
//# sourceMappingURL=casino.js.map
