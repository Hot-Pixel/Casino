const hearts = document.querySelectorAll(".is-favourite");

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

  var mixerCasino = mixitup(".casinoFinder", {
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

  const container = document.querySelector(".casinoFinder");
  let totalContainer = document.querySelector("#is-showing");
  let items = document.querySelectorAll(".mix");
  let itemsHidden = document.querySelectorAll('.mix[style="display: none;"]');
  let itemsLeft = items.length - itemsHidden.length;
  document.querySelector('#removeFilters');

  totalContainer.innerText = items.length;
  console.log(mixerCasino.isMixing());

  container.addEventListener("mixEnd", () => {
    totalContainer.innerText = itemsLeft;
    console.log(mixerCasino.isMixing());
  });

  // container.addEventListener("mixStart", () => {
  //   if (!mixerCasino.isMixing()) {
  //     removeBtn.style.display = "none";
  //   } else if (mixerCasino.isMixing()) {
  //     removeBtn.style.display = "inline-block";
  //   }
  // });

};

export { filterCasino as f };
//# sourceMappingURL=filterCasino-9da575ad.js.map
