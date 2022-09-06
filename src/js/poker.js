import menuPoker from "./modules/menuPoker.js";
import carouselPoker from "./modules/carouselPoker.js";
import accordion from "./modules/accordion.js";

const menuPokerExist = document.getElementsByClassName("menuPoker");

window.addEventListener("load", () => {
  if (menuPokerExist.length > 0) {
    accordion();
    carouselPoker();
  }
});

const popUpCloseBtn = document.querySelector('.popUpBalance__closeBtn');
const popUpOpenBtn = document.querySelector('.popUpBalance__openBtn');
const popUpMenu = document.querySelector('.popUpBalance');

popUpOpenBtn.addEventListener('click', () => {
  popUpMenu.style.display = 'block';
})

popUpCloseBtn.addEventListener('click', () => {
  popUpMenu.style.display = 'none';
})

const menuHeaderOpenBtn = document.querySelector(".menuHeader__openBtn");
const menuHeaderCloseBtn = document.querySelector(".menuHeader__closeBtn");
const menuHeader = document.querySelector(".menuHeader");

menuHeaderOpenBtn.addEventListener("click", () => {
  menuHeader.style.display = "flex";
});
menuHeaderCloseBtn.addEventListener("click", () => {
  menuHeader.style.display = "none";
});

