import { gsap } from "gsap";

function accordionDeposit() {
  const accorWrapper = document.getElementsByClassName("depositDetail__card-tc");
  const accorArrows = document.getElementsByClassName("tc__header");
  const accorBody = document.getElementsByClassName("tc__body");

  if (!accorWrapper) return;

  for (let n = 0; n < accorWrapper.length; n++) {
    accorArrows[n].addEventListener("click", () => {
      if (accorWrapper[n].classList.contains("active")) {
        accorWrapper[n].classList.remove("active");
      } else {
        accorWrapper[n].classList.add("active");
      }
    });
  }
}

export default accordionDeposit;