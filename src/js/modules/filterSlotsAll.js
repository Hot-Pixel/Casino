import mixitup from "mixitup";
import mixitupMultifilter from "./mixitup-multifilter.js";
mixitup.use(mixitupMultifilter);

const filterSlotsAll = () => {
  const tags = document.querySelectorAll(".filterSlots__tag");
  const hearts = document.querySelectorAll(".gridGames__item-favourite");
  const btnSlotsMenuOpen = document.querySelector(".btn__openFilterMenu");
  const btnSlotsMenuClose = document.querySelector(".btn__closeFilterMenu");
  const filterSlotsMenu = document.querySelector(".filterSlotsM__menu");
  const filterSlotsActions = document.querySelectorAll(".filterSlotsM__action");

  let mixerSlots = null;

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

  const container = document.querySelector(".slotsFinder");

  if (window.innerWidth < 1280) {
    mixerSlots = mixitup(container, {
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
    mixerSlots = mixitup(container, {
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
    console.log(state)
    if (state.totalShow < state.totalTargets) {
      resetBtn.classList.add("visible");
    } else {
      resetBtn.classList.remove("visible");
    }
  });

  btnSlotsMenuOpen.addEventListener("click", () => {
    filterSlotsMenu.classList.add("open");
  });

  btnSlotsMenuClose.addEventListener("click", () => {
    filterSlotsMenu.classList.remove("open");
  });

  filterSlotsActions.forEach((action) => {
    action.addEventListener("click", () => {
      filterSlotsMenu.classList.remove("open");
    });
  });
};

export default filterSlotsAll;
