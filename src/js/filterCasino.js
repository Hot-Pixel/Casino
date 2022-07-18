const hearts = document.querySelectorAll(".o-grid--games-fav");

const filterCasino = () => {
  hearts.forEach((heart) => {
    heart.addEventListener("click", () => {
      heart.classList.toggle("fav");
      if (heart.classList.contains("fav")) {
        heart.parentElement.parentElement.classList.add("favorito");
      } else {
        heart.parentElement.parentElement.classList.remove("favorito");
      }
    });
  });

  var mixerCasino = mixitup(".m-casino--finder", {
    multifilter: {
      enable: true,
    },
    controls: {
      enable: true,
    },
    animation: {
      enable: false,
    },
  });
}

export default filterCasino;