import { Splide } from "@splidejs/splide";

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

export default carouselBets;
