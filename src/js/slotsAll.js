import mixitup from 'mixitup';
import mixitupMultifilter from './mixitup-multifilter.js';

mixitup.use(mixitupMultifilter);

const tags = document.querySelectorAll(".o-filter--slots-tag");
const hearts = document.querySelectorAll(".o-grid--games-fav");

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

const mixerSlots = mixitup(".m-slots--finder", {
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
