import { S as Splide } from './splide.esm-20cd2e1c.js';
import { m as mixitup } from './mixitup-b8d39d7d.js';
import { p as popUpSaldo, m as marginHeader, d as depositSteps, a as depositAmmount, b as depositCopy, c as menuHeaderMobile } from './menuHeaderMobile-4afd8372.js';

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

  var carouselMenuPromo = new Splide(".filter__promo .splide", {
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
  popUpSaldo();
  marginHeader();
  depositSteps();
  depositAmmount();
  depositCopy();
  filterPromo();
  carouselPromociones();
  menuHeaderMobile();
});
//# sourceMappingURL=promociones.js.map
