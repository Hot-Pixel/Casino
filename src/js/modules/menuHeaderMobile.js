import { gsap } from "gsap";


function menuHeaderMobile() {
  const menuHeaderOpenBtn = document.querySelector(".menuHeader__openBtn");
  const menuHeaderCloseBtn = document.querySelector(".menuHeader__closeBtn");
  const menuHeader = document.querySelector(".menuHeader");

  if(!menuHeader) return;

  menuHeaderOpenBtn.addEventListener("click", () => {
    menuHeader.style.display = "flex";
    gsap.to(menuHeader, { left: "0", opacity: 1, duration: 0.7 });
  });

  menuHeaderCloseBtn.addEventListener("click", () => {
    gsap
      .to(menuHeader, { left: "-90vw", opacity: 0, duration: 0.3 })
      .to(menuHeader, { display: "none", duration: 0 });
  });
}

export default menuHeaderMobile;