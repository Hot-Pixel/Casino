import { p as popUpSaldo, m as marginHeader, d as depositSteps, a as depositAmmount, b as depositCopy, c as menuHeaderMobile, u as userMenuMobile } from './userMenuMobile-15c9c52f.js';
import { f as favHeart } from './favHeart-fc186b4a.js';
import { m as mixitup } from './mixitup-b8d39d7d.js';
import { m as mixitupMultifilter } from './mixitup-multifilter-5efd6c76.js';

mixitup.use(mixitupMultifilter);

function filterWheel() {
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
  const totalHTML = document.querySelector(".is-showing span");
  const state = mixerRuleta.getState();
  const total = state.totalShow;
  totalHTML.innerHTML = total;

  container.addEventListener("mixEnd", () => {
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
}

window.addEventListener('load', () => {
  popUpSaldo();
  marginHeader();
  favHeart();
  depositSteps();
  depositAmmount();
  filterWheel();
  depositCopy();
  menuHeaderMobile();
  userMenuMobile();
});
//# sourceMappingURL=ruleta.js.map
