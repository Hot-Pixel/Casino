import { g as gsapWithCSS } from './menuHeaderMobile-4afd8372.js';

function userMenuMobile() {
  const userMenuMobileOpen = document.querySelector(".userMenuMobile__open");
  const userMenuMobile = document.querySelector(".userMenuMobile");

  console.log(userMenuMobile);

  userMenuMobileOpen.addEventListener("click", () => {
    userMenuMobile.style.display = "flex";
    gsapWithCSS.to(userMenuMobile, { right: '0', opacity: 1, duration: 0.4 });
  });
}

export { userMenuMobile as u };
//# sourceMappingURL=userMenuMobile-b2c1f232.js.map
