import { gsap } from "gsap";

const arrowArr = document.getElementsByClassName("js-arrow__grid");
const gridArr = document.getElementsByClassName("gridHalf__grid");
const gridNodes = document.querySelectorAll("gridHalf__grid");

function collapseGrid() {

  console.log(gridArr)

  if (window.innerWidth < 1280) {
    gridNodes.forEach( e => {
      e.classList.remove('active');
    });
    for (let n = 0; n < arrowArr.length; n++) {
      arrowArr[n].addEventListener("click", () => {
        if (gridArr[n].classList.contains("active")) {
          gsap
            .timeline()
            .to(arrowArr[n], { rotation: -90, duration: 0.3 })
            .to(gridArr[n], { opacity: 0, duration: 0.6 })
            .to(gridArr[n], { height: 0, duration: 0.3 });
          gridArr[n].classList.remove("active");
        } else {
          gsap
            .timeline()
            .to(arrowArr[n], { rotation: 0, duration: 0.3 })
            .to(gridArr[n], { height: "auto", duration: 0.3 })
            .to(gridArr[n], { opacity: 1, duration: 0.6 });
          gridArr[n].classList.add("active");
        }
      });
    }
  } else {
    for (let n = 0; n < arrowArr.length; n++) {
      arrowArr[n].addEventListener("click", () => {
        if (gridArr[n].classList.contains("active")) {
          gsap
            .timeline()
            .to(arrowArr[n], { rotation: -90, duration: 0.3 })
            .to(gridArr[n], { opacity: 0, duration: 0.6 })
            .to(gridArr[n], { height: 0, duration: 0.3 });
          gridArr[n].classList.remove("active");
        } else {
          gsap
            .timeline()
            .to(arrowArr[n], { rotation: 0, duration: 0.3 })
            .to(gridArr[n], { height: "auto", duration: 0.3 })
            .to(gridArr[n], { opacity: 1, duration: 0.6 });
          gridArr[n].classList.add("active");
        }
      });
    }
  }
}

export default collapseGrid;
