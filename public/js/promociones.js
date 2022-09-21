import { S as Splide$1 } from './splide.esm-20cd2e1c.js';
import { m as mixitup } from './mixitup-b8d39d7d.js';
import { p as popUpSaldo, m as marginHeader, d as depositSteps, a as depositAmmount } from './depositAmmount-a098a8a3.js';

const container = document.querySelector(".finder__promo");

const filterPromo = () => {
  mixitup( container, {
    controls: {
      enable: true,
    },
    animation: {
      enable: false,
    },
  });

  var carouselMenuPromo = new Splide$1(".filter__promo .splide", {
    pagination: false,
    arrows: false,
    perPage: 3,
    padding: { left: 0, right: 30 },
    perMove: 1,
    gap: 5,
  });
  carouselMenuPromo.mount();
};

function carouselPromociones() {
    var carouselPromo = new Splide(".carouselPromo__slider", {
        arrows: true,
        pagination: false,
        perPage: 3,
        perMove: 1,
        breakpoints: {
          1280: {
            perPage: 2,
          },
          768: {
            perPage: 1,
          }
        }
      });
      carouselPromo.mount();
}

window.addEventListener('load', () => {
  filterCasino();
  popUpSaldo();
  marginHeader();
  depositSteps();
  depositAmmount();
  filterPromo();
  carouselPromociones();
});
//# sourceMappingURL=promociones.js.map
