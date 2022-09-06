import { Splide } from "@splidejs/splide";
import { Grid } from "@splidejs/splide-extension-grid";
import { gsap } from "gsap";

//CAROUSEL BANNER
var carouselBanner = new Splide(".bannerCarousel .splide", {
  perPage: 1,
  arrow: true,
  pagination: false
});

carouselBanner.mount();

//CAROUSEL JACKPOT
var carouselJackpot = new Splide(".jackpot__carousel", {
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
carouselJackpot.mount();

//CAROUSEL GRID FULL PAGE
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

const carouselGrid = new Splide(gridFull, {
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

carouselGrid.mount({ Grid });

//CAROUSEL BETS
var carousel = new Splide(".carouselBets__carousel", {
  pagination: false,
  arrows: true,
  perPage: 4,
  padding: { left: 0, right: 50 },
  perMove: 1,
  gap: 15,
  breakpoints: {
    1600: {
      perPage: 3,
      padding: { left: 0, right: 150 },
    },
    1280: {
      perPage: 3,
      padding: { left: 0, right: 50 },
    },
    1024: {
      perPage: 2,
      padding: { left: 0, right: 100 },
      arrows: false,
    },
    768: {
      perPage: 2,
      padding: { left: 0, right: 50 },
      arrows: false,
    },
    620: {
      perPage: 1,
      padding: { left: 0, right: 200 },
      arrows: false,
    },
    475: {
      perPage: 1,
      padding: { left: 0, right: 50 },
      arrows: false,
    },
  },
});
carousel.mount();

//ANIMATION COLLAPSE GRID HALF
const arrowArr = document.getElementsByClassName("js-arrow__grid");
const gridArr = document.getElementsByClassName("gridHalf__grid");

for (let n = 0; n < arrowArr.length; n++) {
  arrowArr[n].addEventListener("click", () => {
    if (gridArr[n].classList.contains("active")) {
      gsap
        .timeline()
        .to(arrowArr[n], { rotation: -90, duration: 0.3 })
        .to(gridArr[n], { opacity: 0, duration: 0.6 })
        .to(gridArr[n], { height: 0, duration: 0.3 });
      gridArr[n].classList.remove("active");
    } else {
      gsap
        .timeline()
        .to(arrowArr[n], { rotation: 0, duration: 0.3 })
        .to(gridArr[n], { height: "auto", duration: 0.3 })
        .to(gridArr[n], { opacity: 1, duration: 0.6 });
      gridArr[n].classList.add("active");
    }
  });
}

const popUpCloseBtn = document.querySelector('.popUpBalance__closeBtn');
const popUpOpenBtn = document.querySelector('.popUpBalance__openBtn');
const popUpMenu = document.querySelector('.popUpBalance');

popUpOpenBtn.addEventListener('click', () => {
  popUpMenu.style.display = 'block';
})

popUpCloseBtn.addEventListener('click', () => {
  popUpMenu.style.display = 'none';
})

