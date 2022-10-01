import { g as gsapWithCSS } from './userMenuMobile-9985a7c7.js';

function accordion() {
    const accorArrows = document.getElementsByClassName("accorArrow");
    const accorBody = document.getElementsByClassName("body");

    for (let n = 0; n < accorArrows.length; n++) {
      accorArrows[n].addEventListener("click", () => {
        if (accorBody[n].classList.contains("active")) {
          gsapWithCSS
            .timeline()
            .to(accorArrows[n], { rotation: -90, duration: 0.3 })
            .to(accorBody[n], { opacity: 0, duration: 0.3 })
            .to(accorBody[n], { height: 0, padding:0, duration: 0.3 });
          accorBody[n].classList.remove("active");
        } else {
          gsapWithCSS
            .timeline()
            .to(accorArrows[n], { rotation: 0, duration: 0.3 })
            .to(accorBody[n], { height: "auto", padding: 15, duration: 0.3 })
            .to(accorBody[n], { opacity: 1, duration: 0.3 });
          accorBody[n].classList.add("active");
        }
      });
    }
  }

export { accordion as a };
//# sourceMappingURL=accordion-31d3010b.js.map
