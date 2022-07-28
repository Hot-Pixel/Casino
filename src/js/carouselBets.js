function carouselBets() {
  var carousel = new Splide(".carouselBets__carousel", {
    pagination: false,
    arrows: true,
    perPage: 5,
    perMove: 1,
    gap: 15,
    breakpoints: {
      1600: {
        perPage: 4,
      },
      1200: {
        perPage: 3,
      },
      992: {
        perPage: 2,
        padding: { left: 0, right: 50 },
        arrows: false,
      },
      767: {
        perPage: 1,
        padding: { left: 0, right: 50 },
        arrows: false,
      },
    },
  });
  carousel.mount();
}

export default carouselBets;
