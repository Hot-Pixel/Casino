import { g as gsapWithCSS } from './depositSteps-97b2c431.js';

const popUpCloseBtn = document.querySelector(".popUpBalance__closeBtn");
const popUpOpenBtn = document.querySelector(".popUpBalance__openBtn");
const popUpMenu = document.querySelector(".popUpBalance");

function popUpSaldo() {
  popUpOpenBtn.addEventListener("click", () => {
    gsapWithCSS
      .timeline()
      .to(popUpMenu, { display: "block", duration: 0 })
      .to(popUpMenu, { opacity: 1, duration: 0.4 });
  });

  popUpCloseBtn.addEventListener("click", () => {
    gsapWithCSS
      .timeline()
      .to(popUpMenu, { opacity: 0, duration: 0.2 })
      .to(popUpMenu, { display: "none", duration: 0 });
  });
}

function marginHeader() {
  const header = document.querySelector(".header");
  const headerMobile = document.querySelector(".header__mobile--top");
  const contentBlock = document.querySelector(".has-header");

  if( window.innerWidth < 1280 ) {

    console.log(headerMobile.offsetHeight);

    contentBlock.style.marginTop = `${headerMobile.offsetHeight}px`;

    window.addEventListener("resize", () => {
      contentBlock.style.marginTop = `${headerMobile.offsetHeight}px`;
    });

  } else {

    contentBlock.style.marginTop = `${header.offsetHeight}px`;

    window.addEventListener("resize", () => {
      contentBlock.style.marginTop = `${header.offsetHeight}px`;
    });

  }

}

export { marginHeader as m, popUpSaldo as p };
//# sourceMappingURL=marginHeader-e2ffb0b7.js.map
