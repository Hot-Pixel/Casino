import { g as gsapWithCSS } from './menuHeaderMobile-4afd8372.js';

function userMenuMobile() {
  const userMenusMobileOpen = document.querySelectorAll(".userMenuMobile__open");
  document.querySelectorAll(".userMenuMobile");

  userMenusMobileOpen.forEach( (btn) => {
    userMenusMobileOpen.addEventListener("click", () => {
      userMenuMobile.style.display = "flex";
      gsapWithCSS.to(userMenuMobile, { left: 0, opacity: 1, duration: 0.4 });
    });
  });

}

export { userMenuMobile as u };
//# sourceMappingURL=userMenuMobile-54998edf.js.map
