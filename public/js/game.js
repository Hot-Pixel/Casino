(function () {
    'use strict';

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
<<<<<<< Updated upstream

        gameExclBtn.addEventListener("click", () => {
          gameBlock.forEach( block => {
            block.classList.remove("block-active");
          });
          gameExclBlock.classList.add("block-active");
=======
        depositStep3.classList.add("active");
        return false;
      });
    });
  }

  function depositAmmount() {
    const btnsArr20 = document.querySelectorAll(".btnAmmount__20");
    const btnsArr50 = document.querySelectorAll(".btnAmmount__50");
    const btnsArr100 = document.querySelectorAll(".btnAmmount__100");


    btnsArr20.forEach((btn20) => {
      btn20.addEventListener("click", (e) => {
        console.log(e.currentTarget);
          let input = document.querySelector(e.currentTarget.dataset.input);
          input.value = 20;
        });
    });
    btnsArr50.forEach((btn50) => {
      btn50.addEventListener("click", (e) => {
        let input = document.querySelector(e.currentTarget.dataset.input);
        input.value = 50;
        });
    });
    btnsArr100.forEach((btn100) => {
      btn100.addEventListener("click", (e) => {
        let input = document.querySelector(e.currentTarget.dataset.input);
        input.value = 100;
>>>>>>> Stashed changes
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

    gameNav();

})();
