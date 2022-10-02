import popUpSaldo from "./modules/popUpBalance.js";
import marginHeader from "./modules/marginHeader.js";
import gameNav from "./modules/gameNav.js";
import depositSteps from "./modules/depositSteps.js";
import depositAmmount from "./modules/depositAmmount.js";
import depositCopy from "./modules/depositCopy.js";
import menuHeaderMobile from "./modules/menuHeaderMobile.js";
import userMenuMobile from "./modules/userMenuMobile.js";

marginHeader()

window.addEventListener('load', () => {
  popUpSaldo()
  gameNav()
  depositSteps();
  depositAmmount();
  depositCopy();
  menuHeaderMobile();
  userMenuMobile();
})

const gameLimitBtn = document.querySelector(".game__limitBtn");
const gameExclBtn = document.querySelector(".game__exclBtn");
const gameBackBtn = document.querySelectorAll(".game__backBtn");
const gameBlock = document.querySelectorAll(".gameBlock");
const gameLimitBlock = document.querySelector(".gameLimitBlock");
const gameExclBlock = document.querySelector(".gameExclBlock");
const gameHomeBlock = document.querySelector(".gameHomeBlock");

gameLimitBtn.addEventListener("click", () => {
  gameBlock.forEach( block => {
    block.classList.remove("block-active");
  })
  gameLimitBlock.classList.add("block-active");
});

gameExclBtn.addEventListener("click", () => {
  gameBlock.forEach( block => {
    block.classList.remove("block-active");
  })
  gameExclBlock.classList.add("block-active");
});

gameBackBtn.forEach( btn => {
  btn.addEventListener('click', () => {
    gameBlock.forEach( block => {
      block.classList.remove("block-active");
    })
    gameHomeBlock.classList.add("block-active");
  })
})