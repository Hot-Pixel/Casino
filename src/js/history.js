import carouselMenuHistory from "./modules/carouselMenuHistory.js";
import calendarHistory from "./modules/calendarHistory.js";
import historyNavBar from "./modules/historyNavBar.js";

document.addEventListener("DOMContentLoaded", () => {
  historyNavBar();
  carouselMenuHistory();
  calendarHistory();
});