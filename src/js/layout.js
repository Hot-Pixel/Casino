import { Splide } from "@splidejs/splide";

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


