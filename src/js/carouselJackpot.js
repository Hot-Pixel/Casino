import { Splide } from "@splidejs/splide";

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

export default carouselJackpot;
