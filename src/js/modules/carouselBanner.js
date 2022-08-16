

function carouselBanner() {
  var carousel = new Splide(".bannerCarousel.splide", {
    perPage: 1,
    arrow: true,
    pagination: false,
  });

  carousel.mount();
}

export default carouselBanner;