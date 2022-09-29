import { c as carouselJackpot, a as carouselGrid, b as collapseGrid } from './collapseGridHalf-7e220775.js';
import { p as popUpSaldo, m as marginHeader, d as depositSteps, a as depositAmmount, b as depositCopy, c as menuHeaderMobile, u as userMenuMobile } from './userMenuMobile-bf242ba6.js';
import './splide.esm-20cd2e1c.js';

let carouselGridA, carouselGridB, carouselGridC;

let data =[
  {
    id: ".gridFullA .splide",
    name: carouselGridA
  },
  {
    id: ".gridFullB .splide",
    name: carouselGridB
  },
  {
    id: ".gridFullC .splide",
    name: carouselGridC
  },
];

window.addEventListener('load', () => {
  carouselJackpot();
  carouselGrid(data[0].id, data[0].name);
  carouselGrid(data[1].id, data[1].name);
  carouselGrid(data[2].id, data[2].name);
  popUpSaldo();
  collapseGrid();
  marginHeader();
  depositSteps();
  depositAmmount();
  depositCopy();
  menuHeaderMobile();
  userMenuMobile();
});
//# sourceMappingURL=slots.js.map
