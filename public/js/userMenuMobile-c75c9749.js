import { g as gsapWithCSS } from './menuHeaderMobile-6c6f9a77.js';

function userMenuMobile() {
  const menuMobileCollapse = document.querySelector(
    ".userMenuMobile__collapse"
  );
  const userMenuMobile = document.querySelector(".userMenuMobile");

  menuMobileCollapse.addEventListener("click", () => {
    gsapWithCSS.to(userMenuMobile, { right: "-90vw", opacity: 0, duration: 0.4 });
  });
}

export { userMenuMobile as u };
//# sourceMappingURL=userMenuMobile-c75c9749.js.map
