import { gsap } from "gsap";

function popUpSaldo() {
  const popUpCloseBtn = document.querySelector(".popUpBalance__closeBtn");
  const popUpOpenBtns = document.querySelectorAll(".popUpBalance__openBtn");
  const popUpMenu = document.querySelector(".popUpBalance");
  const header = document.querySelector(".header");

  if (popUpOpenBtns.length === 0) return;

  popUpMenu.style.marginTop = `${header.offsetHeight}px`;

  popUpOpenBtns.forEach((btn) => {
    if (window.innerWidth < 1280) {
      btn.addEventListener("click", () => {
        gsap
          .timeline()
          .to(popUpMenu, { display: "block", duration: 0 })
          .to(popUpMenu, {
            opacity: 1,
            transform: "translateY(0)",
            duration: 0.4,
          });
      });
    } else {
      btn.addEventListener("click", () => {
        gsap
          .timeline()
          .to(popUpMenu, { display: "block", duration: 0 })
          .to(popUpMenu, { opacity: 1, duration: 0.4 });
      });
    }
  });

  popUpCloseBtn.addEventListener("click", () => {
    if (window.innerWidth < 1280) {
      gsap
        .timeline()
        .to(popUpMenu, {
          opacity: 0,
          transform: "translateY(100%)",
          duration: 0.3,
        })
        .to(popUpMenu, { display: "none", duration: 0 });
    } else {
      gsap
        .timeline()
        .to(popUpMenu, { opacity: 0, duration: 0.2 })
        .to(popUpMenu, { display: "none", duration: 0 });
    }
  });
}

export default popUpSaldo;
