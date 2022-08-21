import { g as gsapWithCSS } from './index-92880765.js';
import { S as Splide$1 } from './splide.esm-20cd2e1c.js';
import { m as mixitup$1 } from './mixitup-b8d39d7d.js';
import { m as menuPoker } from './menuPoker-eba55fa5.js';

function carouselBanner() {
  var carousel = new Splide(".bannerCarousel .splide", {
    perPage: 1,
    arrow: true,
    pagination: false,
  });

  carousel.mount();
}

function carouselJackpot() {
  var carousel = new Splide(".jackpot__carousel", {
    pagination: false,
    arrows: true,
    perPage: 4,
    perMove: 1,
    gap: 15,
    breakpoints: {
      1600: {
        perPage: 3,
      },
      1200: {
        perPage: 2,
        arrows: false,
      },
    },
  });
  carousel.mount();
}

function carouselBets() {
  var carousel = new Splide(".carouselBets__carousel", {
    pagination: false,
    arrows: true,
    perPage: 5,
    perMove: 1,
    gap: 15,
    breakpoints: {
      1600: {
        perPage: 4,
      },
      1200: {
        perPage: 3,
      },
      992: {
        perPage: 2,
        padding: { left: 0, right: 50 },
        arrows: false,
      },
      767: {
        perPage: 1,
        padding: { left: 0, right: 50 },
        arrows: false,
      },
    },
  });
  carousel.mount();
}

const arrowArr = document.getElementsByClassName("js-arrow__grid");
const gridArr = document.getElementsByClassName("gridHalf__grid");

function collapseGrid() {
  for (let n = 0; n < arrowArr.length; n++) {
    arrowArr[n].addEventListener("click", () => {
      if (gridArr[n].classList.contains("active")) {
        gsapWithCSS
          .timeline()
          .to(arrowArr[n], { rotation: -90, duration: 0.3 })
          .to(gridArr[n], { opacity: 0, duration: 0.6 })
          .to(gridArr[n], { height: 0, duration: 0.3 });
        gridArr[n].classList.remove("active");
      } else {
        gsapWithCSS
          .timeline()
          .to(arrowArr[n], { rotation: 0, duration: 0.3 })
          .to(gridArr[n], { height: "auto", duration: 0.3 })
          .to(gridArr[n], { opacity: 1, duration: 0.6 });
        gridArr[n].classList.add("active");
      }
    });
  }
}

const hearts$1 = document.querySelectorAll(".is-favourite");

const filterCasino = () => {
  hearts$1.forEach((heart) => {
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

const filterPromo = () => {
  mixitup$1(".finder__promo", {
    controls: {
      enable: true,
    },
    animation: {
      enable: false,
    },
  });

  var carouselPromo = new Splide$1(".filter__promo .splide", {
    pagination: false,
    arrows: false,
    perPage: 3,
    padding: { left: 0, right: 30 },
    perMove: 1,
    gap: 5,
  });
  carouselPromo.mount();
};

const tags = document.querySelectorAll(".o-filter--slots-tag");
const hearts = document.querySelectorAll(".o-grid--games-fav");

const filterSlotsAll = () => {
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

  mixitup(".m-slots--finder", {
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
};

function carouselFull() {
  const gridFull = document.querySelector(".gridFull .splide");
  const order = gridFull.dataset.order - 1;
  const item = [1, 1];
  const arrDim = [
    [2, 2],
    [2, 2],
    [2, 2],
    [2, 2],
    [2, 2],
    [2, 2],
  ];

  arrDim.splice(order, 0, item);

  const splideGrid = new Splide(gridFull, {
    perPage: 4,
    perMove: 1,
    pagination: false,
    gap: 6,
    grid: {
      dimensions: arrDim,
      gap: {
        row: 6,
        col: 6,
      },
    },
    breakpoints: {
      991: {
        perPage: 1,
        arrows: false,
        drag: 'free',
        grid: {
          rows: 2,
          cols: 2,
        }
      },
    },
  });

  splideGrid.mount({ Grid });
}

const carouselBannerExist = document.getElementsByClassName("bannerCarousel");
const carouselJackpotExist =
  document.getElementsByClassName("jackpot__carousel");
const carouselBetsExist = document.getElementsByClassName(
  "carouselBets__carousel"
);
const gridHalfExist = document.getElementsByClassName("gridHalf");
const casinoFinderExist = document.getElementsByClassName("casinoFinder");
const slotsAllFinderExist = document.getElementsByClassName("m-slots--finder");
const promoFinderExist = document.getElementsByClassName("finder__promo");
const menuPokerExist = document.getElementsByClassName("menuPoker");
const carouselFullExist = document.getElementsByClassName("gridFull");

window.addEventListener("load", () => {
  if (carouselBannerExist.length > 0) {
    carouselBanner();
  }
  if (carouselJackpotExist.length > 0) {
    carouselJackpot();
  }
  if (carouselBetsExist.length > 0) {
    carouselBets();
  }
  if (gridHalfExist.length > 0) {
    collapseGrid();
  }
  if (casinoFinderExist.length > 0) {
    filterCasino();
  }
  if (slotsAllFinderExist.length > 0) {
    filterSlotsAll();
  }
  if (promoFinderExist.length > 0) {
    filterPromo();
  }
  if (menuPokerExist.length > 0) {
    menuPoker();
    accorPoker();
  }
  if (carouselFullExist.length > 0) {
    carouselFull();
  }
});

var carouselPoker = new Splide$1(".menuPoker .splide", {
  pagination: false,
  arrows: false,
  perPage: 4,
  padding: { left: 0, right: 100 },
  perMove: 1,
  breakpoints: {
    768: {
      perPage: 3,
    },
    576: {
      perPage: 2,
    }
  }
});
carouselPoker.mount();
//# sourceMappingURL=layout.js.map
