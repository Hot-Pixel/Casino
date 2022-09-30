import { f as favHeart } from './favHeart-9f93afda.js';
import { m as mixitup } from './mixitup-b8d39d7d.js';
import { m as mixitupMultifilter } from './mixitup-multifilter-2daf904c.js';
import { a as accordion } from './accordion-8d12250c.js';
import { p as popUpSaldo, m as marginHeader, d as depositSteps, a as depositAmmount, b as depositCopy, c as menuHeaderMobile, u as userMenuMobile } from './userMenuMobile-d62b6803.js';

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
    mixitup(container, {
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
    mixitup(container, {
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

window.addEventListener("load", () => {
  accordion();
  filterSlotsAll();
  favHeart();
  popUpSaldo();
  marginHeader();
  depositSteps();
  depositAmmount();
  depositCopy();
  menuHeaderMobile();
  userMenuMobile();
});
//# sourceMappingURL=slotsAll.js.map
