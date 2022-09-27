import { gsap } from "gsap";

function userMenuMobile() {
  const userMenuMobileOpen = document.querySelector(".userMenuMobile__open");
  const userMenuMobileClose = document.querySelector(
    ".userMenuMobile__collapse"
  );
  const userMenuMobile = document.querySelector(".userMenuMobile");

  userMenuMobileOpen.addEventListener("click", () => {
    userMenuMobile.style.display = "flex";
    gsap.to(userMenuMobile, { right: "0", opacity: 1, duration: 0.7 });
  });

  userMenuMobileClose.addEventListener("click", () => {
    gsap
      .to(userMenuMobile, { right: "-90vw", opacity: 0, duration: 0.3 })
      .to(userMenuMobile, { display: "none", duration: 0 });
  });
}

export default userMenuMobile;
