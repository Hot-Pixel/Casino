import filterPromo from "./modules/filterPromo.js";
import carouselPromociones from "./modules/carouselPromociones.js";
//import adaptationModule from "./modules/adaptationModule.js";

//adaptationModule(".grid__promo-card--bottom")

document.addEventListener('DOMContentLoaded', () => {
  filterPromo()
  carouselPromociones()
})
