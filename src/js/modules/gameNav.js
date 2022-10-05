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
}

export default gameNav;