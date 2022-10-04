import { m as marginHeader, p as popUpSaldo, d as depositSteps, a as depositAmmount, b as depositCopy, c as menuHeaderMobile, u as userMenuMobile } from './userMenuMobile-06ed4418.js';
import { h as historyNavBar } from './historyNavBar-3c80e964.js';
import { S as Splide } from './splide.esm-20cd2e1c.js';
<<<<<<< HEAD
import { l as loading } from './loading-39012ce4.js';
=======
import flatpickr from 'flatpickr';
import 'flatpickr/dist/esm/l10n/es.js';
import rangePlugin from 'flatpickr/dist/esm/plugins/rangePlugin.js';
>>>>>>> dev

function carouselMenuHistory() {
  var carousel = new Splide(".splide", {
    pagination: false,
    arrows: false,
    perPage: 2,
    padding: { left: 0, right: 80 },
    perMove: 1,
    drag: "free",
    breakpoints: {
      768: {
        perPage: 3,
        padding: { left: 0, right: 80 },
      },
      576: {
        perPage: 2,
        padding: { left: 0, right: 80 },
      }
    }
  });

  carousel.mount();
}

function calendarHistory() {
  flatpickr("#startDate", {
    locale: 'es',
    plugins: [new rangePlugin({ input: "#endDate" })],
    dateFormat: "d-m-Y",
    disableMobile: "true"
  });
}

loading();
marginHeader();

window.addEventListener('load', () => {
  popUpSaldo();
  historyNavBar();
  depositSteps();
  depositAmmount();
  depositCopy();
  menuHeaderMobile();
  userMenuMobile();
  carouselMenuHistory();
  calendarHistory();
});
//# sourceMappingURL=history.js.map
