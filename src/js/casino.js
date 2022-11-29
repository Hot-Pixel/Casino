import favHeart from "./modules/favHeart.js";
import filterCasino from "./modules/filterCasino.js";

document.addEventListener('DOMContentLoaded', () => {
  filterCasino();
  favHeart().init();
})

 const gameSelect = document.querySelector("#casino-game");
    const selectLinker = ()=>{
        if (gameSelect.value == "all"){
            window.location.href = "/casino.html";
        }else if (gameSelect.value == ".RULETAS"){
            window.location.href = "/casino/ruleta.html";
        }else {
            window.location.href = "/casino/blackjack-online.html";
        }
    }
    gameSelect.addEventListener("change", selectLinker)
