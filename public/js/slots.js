import { c as carouselJackpot, b as carouselGrid, a as collapseGrid } from './collapseGridHalf-4cd488fb.js';
import { p as popUpSaldo, m as marginHeader, d as depositSteps, a as depositAmmount, b as depositCopy, c as menuHeaderMobile, u as userMenuMobile } from './userMenuMobile-f069f291.js';
import './splide.esm-20cd2e1c.js';

window.addEventListener('load', () => {
  carouselJackpot();
  document.querySelectorAll('.gridFull .splide').forEach(grid => {
    carouselGrid(grid);
  });
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
