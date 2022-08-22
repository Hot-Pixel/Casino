import { m as mixitup } from './mixitup-b8d39d7d.js';
import { m as mixitupMultifilter } from './mixitup-multifilter-2ac2620b.js';
import { g as gsapWithCSS } from './index-92880765.js';

mixitup.use(mixitupMultifilter);

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

mixitup(".slotsFinder", {
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
    onMixClick: function() {
        // Reset the search if a filter is clicked

        if (this.matches('[data-filter]')) {
            inputSearch.value = '';
        }
    }
}
});

const accorArrows = document.getElementsByClassName("accorArrow");
const accorBody = document.getElementsByClassName("body");

for (let n = 0; n < accorArrows.length; n++) {
  accorArrows[n].addEventListener("click", () => {
    if (accorBody[n].classList.contains("active")) {
      gsapWithCSS
        .timeline()
        .to(accorArrows[n], { rotation: -90, duration: 0.3 })
        .to(accorBody[n], { opacity: 0, duration: 0.3 })
        .to(accorBody[n], { height: 0, duration: 0.3 });
      accorBody[n].classList.remove("active");
    } else {
      gsapWithCSS
        .timeline()
        .to(accorArrows[n], { rotation: 90, duration: 0.3 })
        .to(accorBody[n], { height: "auto", duration: 0.3 })
        .to(accorBody[n], { opacity: 1, duration: 0.3 });
      accorBody[n].classList.add("active");
    }
  });
}
//# sourceMappingURL=slotsAll.js.map