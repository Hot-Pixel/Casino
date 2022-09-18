import mixitup from "mixitup";
import mixitupMultifilter from "./mixitup-multifilter.js";

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

export default filterWheel;
