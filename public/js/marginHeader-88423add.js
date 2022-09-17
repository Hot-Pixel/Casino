import { g as gsapWithCSS } from './index-92880765.js';

const popUpCloseBtn = document.querySelector(".popUpBalance__closeBtn");
const popUpOpenBtn = document.querySelector(".popUpBalance__openBtn");
const popUpMenu = document.querySelector(".popUpBalance");

function popUpSaldo() {
  popUpOpenBtn.addEventListener("click", () => {
    popUpMenu.style.display = "block";
    gsapWithCSS
    .timeline()
    .to(popUpMenu, { opacity: 1, duration: 0.4 });
  });

  popUpCloseBtn.addEventListener("click", () => {
    gsapWithCSS
    .timeline()
    .to(popUpMenu, { opacity: 0, duration: 1 });
    popUpMenu.style.display = "none";
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
//# sourceMappingURL=marginHeader-88423add.js.map
