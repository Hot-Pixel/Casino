import { Splide } from "@splidejs/splide";
import { Grid } from "@splidejs/splide-extension-grid";

function carouselGrid() {
  const gridFull = document.querySelector(".gridFull .splide");
  const order = gridFull.dataset.order - 1;
  const item = [1, 1];
  const arrDim = [
    [2, 2],
    [2, 2],
    [2, 2],
    [2, 2],
    [2, 2],
    [2, 2],
  ];
  const arrDimMobile = [
    [3, 2],
    [3, 2],
    [3, 2],
    [3, 2],
  ];

  arrDim.splice(order, 0, item);

  const carouselGrid = new Splide(gridFull, {
    perPage: 4,
    perMove: 1,
    pagination: false,
    gap: 10,
    grid: {
      dimensions: arrDim,
      gap: {
        row: 10,
        col: 10,
      },
    },
    breakpoints: {
      1400: {
        perPage: 3,
      },
      1280: {
        perPage: 2,
      },
      991: {
        perPage: 1,
        arrows: false,
        padding: { left: 0, right: 50 },
        drag: "free",
        grid: {
          dimensions: arrDimMobile,
        },
      },
    },
  });

  carouselGrid.mount({ Grid });
}

export default carouselGrid;

