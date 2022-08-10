import { Splide } from "@splidejs/splide";

const filterPromo = () => {
  var mixerPromo = mixitup(".finder__promo", {
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
}

export default filterPromo;