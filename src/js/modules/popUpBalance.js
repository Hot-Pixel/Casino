import { gsap } from "gsap";


function popUpSaldo() {
  
  const popUpCloseBtn = document.querySelector(".popUpBalance__closeBtn");
  const popUpOpenBtn = document.querySelector(".popUpBalance__openBtn");
  const popUpMenu = document.querySelector(".popUpBalance");

  if(!popUpMenu) return;
  
  popUpOpenBtn.addEventListener("click", () => {
    gsap
      .timeline()
      .to(popUpMenu, { display: "block", duration: 0 })
      .to(popUpMenu, { opacity: 1, duration: 0.4 });
  });

  popUpCloseBtn.addEventListener("click", () => {
    gsap
      .timeline()
      .to(popUpMenu, { opacity: 0, duration: 0.2 })
      .to(popUpMenu, { display: "none", duration: 0 });
  });
}

export default popUpSaldo;
