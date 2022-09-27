import { g as gsapWithCSS } from './menuHeaderMobile-4afd8372.js';

function userMenuMobile() {
  const userMenuMobileOpen = document.querySelector(".userMenuMobile__open");
  const userMenuMobileClose = document.querySelector(
    ".userMenuMobile__collapse"
  );
  const userMenuMobile = document.querySelector(".userMenuMobile");

  userMenuMobileOpen.addEventListener("click", () => {
    userMenuMobile.style.display = "flex";
    gsapWithCSS.to(userMenuMobile, { right: "0", opacity: 1, duration: 0.7 });
  });

  userMenuMobileClose.addEventListener("click", () => {
    gsapWithCSS
      .to(userMenuMobile, { right: "-90vh", opacity: 0, duration: 0.3 })
      .to(userMenuMobile, { display: "none", duration: 0 });
  });
}

export { userMenuMobile as u };
//# sourceMappingURL=userMenuMobile-3696aa78.js.map
