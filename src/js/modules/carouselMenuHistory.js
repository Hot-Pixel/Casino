import { Splide } from "@splidejs/splide";

function carouselMenuHistory() {
  var carousel = new Splide(".splide", {
    pagination: false,
    arrows: false,
    perPage: 2,
    padding: { left: 0, right: 80 },
    perMove: 1,
    drag: "free",
    breakpoints: {
      768: {
        perPage: 3,
        padding: { left: 0, right: 80 },
      },
      576: {
        perPage: 2,
        padding: { left: 0, right: 80 },
      }
    }
  });

  carousel.mount();
}

export default carouselMenuHistory;
