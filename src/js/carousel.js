function sliderBanner() {
    const sliderBanner = new Splide(".m-banner__car", {
      arrow: true,
      pagination: false,
      perPage: 1,
    });


    sliderBanner.mount();
  }

  export default sliderBanner;