import carouselGrid from "./modules/carouselGrid.js";
import carouselLandingSEO from "./modules/carouselLandingSEO.js";
import LobbyApi from "./modules/LobbyAPI.js";

let carouselGridSeo;

window.addEventListener("load", () => {
  LobbyApi();
  carouselLandingSEO();

});
