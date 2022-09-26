import { g as gsapWithCSS } from './menuHeaderMobile-013e6314.js';

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
//# sourceMappingURL=userMenuMobile-e4a7732d.js.map
