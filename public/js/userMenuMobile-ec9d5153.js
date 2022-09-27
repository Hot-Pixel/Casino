import { g as gsapWithCSS } from './menuHeaderMobile-4afd8372.js';

function userMenuMobile() {
  const userMenuMobileOpen = document.querySelector(".userMenuMobile__open");
  const userMenuMobileClose= document.querySelector(".userMenuMobile__collapse");
  const userMenuMobile = document.querySelector(".userMenuMobile");

  console.log(userMenuMobile);

  userMenuMobileOpen.addEventListener("click", () => {
    userMenuMobile.style.display = "flex";
    gsapWithCSS.to(userMenuMobile, { right: '0', opacity: 1, duration: 0.6 });
  });

  userMenuMobileClose.addEventListener("click", () => {
    gsapWithCSS.to(userMenuMobile, { right: '-90vh', opacity: 0, duration: 0.4 });
    userMenuMobile.style.display = "none";
  });
}

export { userMenuMobile as u };
//# sourceMappingURL=userMenuMobile-ec9d5153.js.map
