import { g as gsapWithCSS } from './menuHeaderMobile-4afd8372.js';

function userMenuMobile() {
  const menuMobileOpen = document.querySelector(".header__mobile-user");
  const userMenuMobile = document.querySelector(".userMenuMobile");

  menuMobileOpen.addEventListener("click", () => {
    userMenuMobile.style.display = "flex";
    gsapWithCSS.to(userMenuMobile, { left: 0, opacity: 1, duration: 0.4 });
  });
}

export { userMenuMobile as u };
//# sourceMappingURL=userMenuMobile-122c4009.js.map
