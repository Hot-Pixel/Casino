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
let totalContainer = document.querySelector("#is-showing");
let items = document.querySelectorAll(".mix");
let itemsHidden = document.querySelectorAll('.mix[style="display: none;"]');
let itemsLeft = items.length - itemsHidden.length;
const removeBtn = document.querySelector("#removeFilters");

totalContainer.innerText = items.length;
console.log(mixerRuleta.isMixing());

container.addEventListener("mixEnd", () => {
  totalContainer.innerText = itemsLeft;
  console.log(mixerRuleta.isMixing());
});

// container.addEventListener("mixStart", () => {
//   if (!mixerCasino.isMixing()) {
//     removeBtn.style.display = "none";
//   } else if (mixerCasino.isMixing()) {
//     removeBtn.style.display = "inline-block";
//   }
// });
