import { Splide } from "@splidejs/splide";

function carouselJackpot() {
  var carouselJackpot = new Splide(".jackpot__carousel", {
    pagination: false,
    arrows: true,
    perPage: 4,
    perMove: 1,
    gap: 10,
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
}

export default carouselJackpot;
