import { g as gsapWithCSS } from './userMenuMobile-e0dcc8dc.js';

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
//# sourceMappingURL=loading-2da3e22c.js.map
