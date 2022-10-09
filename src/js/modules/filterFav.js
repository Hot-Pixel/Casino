import mixitup from "mixitup";

function filterFav() {

  const container = document.querySelector(".favoritesGames");
  var mixerCasino = mixitup(container, {
    controls: {
      enable: true,
    },
    animation: {
      enable: false,
    },
  });
}

export default filterFav;