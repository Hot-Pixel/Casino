import { g as gsapWithCSS } from './userMenuMobile-244b77b7.js';

function loading() {
    document.addEventListener("readystatechange", (event) => {
        if (event.target.readyState === "complete") {
          gsapWithCSS
            .timeline()
            .to(".userMenu", { opacity: 1, duration: 0.2 })
            .to(".userContent", { opacity: 1, duration: 0.2 }, "<");
        }
      });
}

export { loading as l };
//# sourceMappingURL=loading-b6ef7632.js.map
