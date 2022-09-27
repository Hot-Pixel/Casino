import { g as gsapWithCSS } from './menuHeaderMobile-4afd8372.js';

function userMenuMobile() {
  const menuMobileOpen = document.querySelector(".userMenuMobile__open");
  const userMenuMobile = document.querySelector(".userMenuMobile");

  menuMobileOpen.addEventListener("click", () => {
    userMenuMobile.style.display = "flex";
    gsapWithCSS.to(userMenuMobile, { left: 0, opacity: 1, duration: 0.4 });
  });
}

export { userMenuMobile as u };
//# sourceMappingURL=userMenuMobile-db7dcf15.js.map
