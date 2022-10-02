import { S as Splide } from './splide.esm-20cd2e1c.js';
import { c as carouselJackpot, a as collapseGrid, b as carouselGrid } from './collapseGridHalf-630a9a89.js';
import { g as gsapWithCSS, m as marginHeader, p as popUpSaldo, d as depositSteps, a as depositAmmount, b as depositCopy, c as menuHeaderMobile, u as userMenuMobile } from './userMenuMobile-a6c3447c.js';

function carouselBanner() {
  getList()
    .then(data => {
      generateSlides(data);
      initSplide();
    });

  function generateSlides(data) {
    const template = document.getElementById("banner-slide-template");
    const target = document.querySelector('.splide__list');
    data.forEach(slide => {
      const clone = template.content.firstElementChild.cloneNode(true);
      clone.innerHTML = clone.innerHTML
        .replaceAll('{title}', slide.txt.title)
        .replaceAll('{body}', slide.txt.description)
        .replaceAll('{link}', slide.url)
        .replaceAll('{cta}', slide.txt.button)
        .replaceAll('{imgDesk}', slide.img.bg)
        .replaceAll('{imgMobile}', slide.img.icon)
        ;
      target.appendChild(clone);
    });
  }

  function initSplide() {
    var carousel = new Splide(".bannerCarousel .splide", {
      perPage: 1,
      arrow: true,
      pagination: false,
    });

    carousel.mount();
  }
}

function accordionDeposit() {
    const accorArrows = document.getElementsByClassName("accorArrowDepo");
    const accorBody = document.getElementsByClassName("tc__body");

    if(!accorArrows) return;

    for (let n = 0; n < accorArrows.length; n++) {
      accorArrows[n].addEventListener("click", () => {
        if (accorBody[n].classList.contains("active")) {
          gsapWithCSS
            .timeline()
            .to(accorArrows[n], { rotation: -90, duration: 0.3 })
            .to(accorBody[n], { opacity: 0, padding: 0,  duration: 0.3 })
            .to(accorBody[n], { height: 0, duration: 0.3 });
          accorBody[n].classList.remove("active");
        } else {
          gsapWithCSS
            .timeline()
            .to(accorArrows[n], { rotation: 0, duration: 0.3 })
            .to(accorBody[n], { height: "auto", padding: '15px 0', duration: 0.3 })
            .to(accorBody[n], { opacity: 1, duration: 0.3 });
          accorBody[n].classList.add("active");
        }
      });
    }
  }

function carouselBets() {
  var carousel = new Splide(".carouselBets__carousel", {
    pagination: false,
    arrows: true,
    perPage: 5,
    padding: 0,
    perMove: 1,
    gap: 10,
    breakpoints: {
      1900: {
        perPage: 4,
        padding: { left: 0, right: 50 },
      },
      1600: {
        perPage: 3,
        padding: { left: 0, right: 120 },
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
      510: {
        perPage: 1,
        padding: { left: 0, right: 50 },
        arrows: false,
      },
    },
  });
  carousel.mount();
}

marginHeader();

window.addEventListener("load", () => {
  accordionDeposit();
  carouselJackpot();
  carouselBets();
  popUpSaldo();
  collapseGrid();
  depositSteps();
  depositAmmount();
  depositCopy();
  menuHeaderMobile();
  userMenuMobile();

  document.querySelectorAll('.gridFull .splide').forEach(grid => {
    carouselGrid(grid);
  });
  carouselBanner();
});
//# sourceMappingURL=home.js.map
