window.addEventListener("load", () => {
  if (jQuery(".m-banner__car").length > 0) {
    sliderBanner();
  }
});

function sliderBanner() {
  const sliderBanner = new Splide(".m-banner__car", {
    arrow: true,
    pagination: false,
    perPage: 1,
  });

  sliderBanner.mount();
}

const arrowGrid = document.querySelector(".js-arrow__grid");
const grid = document.querySelector(".o-grid__half--grid");

arrowGrid.addEventListener("click", () => {
  if (grid.classList.contains('active')) {
    grid.classList.remove('active');
    gsap
      .timeline()
      .to(arrowGrid, { rotation: -90, duration: 0.2 })
      .to(grid, { opacity: 0, duration: 0.3 })
      .to(grid, { height: 0, duration: 0.4 });
  } else {
    grid.classList.add('active');
    gsap
      .timeline()
      .to(arrowGrid, { rotation: 0, duration: 0.2 })
      .to(grid, { height: 'auto', duration: 0.4 })
      .to(grid, { opacity: 1, duration: 0.3 });
  }
});
