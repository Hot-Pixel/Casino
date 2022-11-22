import favHeart from "./modules/favHeart.js";
import filterWheel from "./modules/filterWheel.js";
import LiveRoulette from "./modules/liveRoulette.js";
import adaptationModule from "./modules/adaptationModule.js";

//adaptationModule(".card__content--top");

document.addEventListener('DOMContentLoaded', () => {
  favHeart().init();
  filterWheel()
  LiveRoulette();
})
