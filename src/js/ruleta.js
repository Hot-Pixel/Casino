import favHeart from "./modules/favHeart.js";
import filterWheel from "./modules/filterWheel.js";
import LiveRoulette from "./modules/liveRoulette.js";
import adaptativeContainer from "./modules/adaptativeContainers.js";

adaptativeContainer(".card__content--top");

document.addEventListener('DOMContentLoaded', () => {
  favHeart()
  filterWheel()
  LiveRoulette();
})