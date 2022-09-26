import { gsap } from "gsap";

function userMenuMobile() {
  const menuMobileCollapse = document.querySelector(
    ".userMenuMobile__collapse"
  );
  const userMenuMobile = document.querySelector(".userMenuMobile");

  menuMobileCollapse.addEventListener("click", () => {
    gsap.to(userMenuMobile, { right: "-90vw", opacity: 0, duration: 0.4 });
  });
}

export default userMenuMobile;
