import { gsap } from "gsap";

function accordionDeposit() {
    const accorArrows = document.getElementsByClassName("accorArrowDepo");
    const accorBody = document.getElementsByClassName("tc__body");

    if(!accorArrows) return;

    for (let n = 0; n < accorArrows.length; n++) {
      accorArrows[n].addEventListener("click", () => {
        if (accorBody[n].classList.contains("active")) {
          gsap
            .timeline()
            .to(accorArrows[n], { rotation: -90, duration: 0.3 })
            .to(accorBody[n], { opacity: 0, padding: 0,  duration: 0.3 })
            .to(accorBody[n], { height: 0, duration: 0.3 });
          accorBody[n].classList.remove("active");
        } else {
          gsap
            .timeline()
            .to(accorArrows[n], { rotation: 0, duration: 0.3 })
            .to(accorBody[n], { height: "auto", padding: '15px 0', duration: 0.3 })
            .to(accorBody[n], { opacity: 1, duration: 0.3 });
          accorBody[n].classList.add("active");
        }
      });
    }
  }

  export default accordionDeposit;