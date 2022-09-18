import mixitup from "mixitup";
import mixitupMultifilter from "./mixitup-multifilter.js";
mixitup.use(mixitupMultifilter);

const filterSlotsAll = () => {
  const tags = document.querySelectorAll(".filterSlots__tag");
  const hearts = document.querySelectorAll(".gridGames__item-favourite");

  hearts.forEach((heart) => {
    heart.addEventListener("click", () => {
      heart.classList.toggle("fav");
      if (heart.classList.contains("fav")) {
        heart.parentElement.classList.add("favorito");
      } else {
        heart.parentElement.classList.remove("favorito");
      }
    });
  });

  tags.forEach((tag) => {
    tag.addEventListener("click", (e) => {
      if (e.currentTarget.classList.contains("mixitup-control-active")) {
        e.currentTarget.firstElementChild.setAttribute(
          "src",
          "img/icon-filter-noActive.svg"
        );
      } else {
        e.currentTarget.firstElementChild.setAttribute(
          "src",
          "img/icon-filter-active.svg"
        );
      }
    });
  });

  const container = document.querySelector(".slotsFinder");

  if (window.innerWidth < 1280) {
    console.log("boob");
    const mixerSlots = mixitup(container, {
      multifilter: {
        enable: true,
        parseOn: "submit",
      },
      controls: {
        enable: true,
      },
      animation: {
        enable: false,
      },
      callbacks: {
        onMixClick: function () {
          // Reset the search if a filter is clicked

          if (this.matches("[data-filter]")) {
            inputSearch.value = "";
          }
        },
      },
    });
  } else {
    console.log("bob");
    const mixerSlots = mixitup(container, {
      multifilter: {
        enable: true,
      },
      controls: {
        enable: true,
      },
      animation: {
        enable: false,
      },
      callbacks: {
        onMixClick: function () {
          // Reset the search if a filter is clicked

          if (this.matches("[data-filter]")) {
            inputSearch.value = "";
          }
        },
      },
    });
  }

  const resetBtn = document.getElementById("resetSlots");

  container.addEventListener("mixEnd", () => {
    const state = mixerSlots.getState();
    if (state.totalShow < state.totalTargets) {
      resetBtn.classList.add("visible");
    } else {
      resetBtn.classList.remove("visible");
    }
  });

  const btnSlotsMenuOpen = document.querySelector(".btn__openFilterMenu");
  const btnSlotsMenuClose = document.querySelector(".btn__closeFilterMenu");
  const filterSoltsMenu = document.querySelector(".filterSlotsM__menu");

  btnSlotsMenuOpen.addEventListener("click", () => {
    filterSoltsMenu.classList.add("open");
  });

  btnSlotsMenuClose.addEventListener("click", () => {
    filterSoltsMenu.classList.remove("open");
  });
};

export default filterSlotsAll;
