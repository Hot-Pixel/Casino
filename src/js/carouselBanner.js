function carouselBanner() {
  var carousel = new Splide(".m-banner__car.splide", {
    perPage: 1,
    arrow: true,
    pagination: false,
  });

  carousel.mount();
}

export default carouselBanner;