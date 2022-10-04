import { gsap } from "gsap";

function loading() {
    document.addEventListener("readystatechange", (event) => {
        if (event.target.readyState === "complete") {
          gsap
            .timeline()
            .to(".userMenu", { opacity: 1, duration: 0.2 })
            .to(".userContent", { opacity: 1, duration: 0.2 }, "<");
        }
      });
}

export default loading;