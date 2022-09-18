import { Splide } from "@splidejs/splide";
import mixitup from 'mixitup';

const container = document.querySelector(".finder__promo")

const filterPromo = () => {
  var mixerPromo = mixitup( container, {
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
}

export default filterPromo;