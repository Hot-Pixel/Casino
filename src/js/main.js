window.addEventListener("load", () => {
  if (jQuery(".m-banner__car").length > 0) {
    sliderBanner();
  }
});

function add( x, y ) {
  return x + y;
}

function sliderBanner() {
  const sliderBanner = new Splide(".m-banner__car", {
    arrow: true,
    pagination: false,
    perPage: 1,
  });



  sliderBanner.mount();
}

const arrowGrid = document.querySelector(".js-arrow__grid");



function accGridHalf() {
  arrowGrid.addEventListener("click", () => {
    gsap.to(".o-grid__half--grid", { opacity: 0, duration: 1 });
  });
}