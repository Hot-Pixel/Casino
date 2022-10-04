import { m as marginHeader, p as popUpSaldo, d as depositSteps, a as depositAmmount, b as depositCopy, c as menuHeaderMobile, u as userMenuMobile } from './userMenuMobile-87364a79.js';
import { l as loading } from './loading-39012ce4.js';

function gameNav() {
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
      });
      gameLimitBlock.classList.add("block-active");
    });

    gameExclBtn.addEventListener("click", () => {
      gameBlock.forEach( block => {
        block.classList.remove("block-active");
      });
      gameExclBlock.classList.add("block-active");
    });

    gameBackBtn.forEach( btn => {
      btn.addEventListener('click', () => {
        gameBlock.forEach( block => {
          block.classList.remove("block-active");
        });
        gameHomeBlock.classList.add("block-active");
      });
    });
}

loading();
marginHeader();

window.addEventListener('load', () => {
  popUpSaldo();
  gameNav();
  depositSteps();
  depositAmmount();
  depositCopy();
  menuHeaderMobile();
  userMenuMobile();
});
//# sourceMappingURL=game.js.map
