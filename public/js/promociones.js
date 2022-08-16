import { S as Splide } from './splide.esm-20cd2e1c.js';
import { m as mixitup } from './mixitup-b8d39d7d.js';

mixitup(".finder__promo", {
  controls: {
    enable: true,
  },
  animation: {
    enable: false,
  },
});

var carouselPromo = new Splide(".filter__promo .splide", {
  pagination: false,
  arrows: false,
  perPage: 3,
  padding: { left: 0, right: 30 },
  perMove: 1,
  gap: 5,
});
carouselPromo.mount();
//# sourceMappingURL=promociones.js.map
