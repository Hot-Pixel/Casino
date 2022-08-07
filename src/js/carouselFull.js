import { Splide } from "@splidejs/splide";
import { Grid } from "@splidejs/splide-extension-grid";

function carouselFull() {
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

  arrDim.splice(order, 0, item);

  const splideGrid = new Splide(gridFull, {
    perPage: 4,
    perMove: 1,
    pagination: false,
    gap: 6,
    grid: {
      dimensions: arrDim,
      gap: {
        row: 6,
        col: 6,
      },
    },
    breakpoints: {
      991: {
        perPage: 1,
        arrows: false,
        drag: 'free',
        grid: {
          rows: 2,
          cols: 2,
        }
      },
    },
  });

  splideGrid.mount({ Grid });
}

export default carouselFull;
