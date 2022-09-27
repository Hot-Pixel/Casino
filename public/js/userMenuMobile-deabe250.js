import { g as gsapWithCSS } from './menuHeaderMobile-4afd8372.js';

function userMenuMobile() {
  const menuMobileCollapse = document.querySelector(
    ".header__mobile-user"
  );
  const userMenuMobile = document.querySelector(".userMenuMobile");

  menuMobileCollapse.addEventListener("click", () => {
    userMenuMobile.style.display = "flex";
    gsapWithCSS.to(userMenuMobile, { left: 0, opacity: 1, duration: 0.4 });
  });
}

export { userMenuMobile as u };
//# sourceMappingURL=userMenuMobile-deabe250.js.map
