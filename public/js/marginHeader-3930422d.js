function marginHeader() {
  const header = document.querySelector(".header");
  const headerMobile = document.querySelector(".header__mobile--top");
  const contentBlocks = document.querySelectorAll(".has-header");

  if (window.innerWidth < 1280) {

    contentBlocks.forEach((block) => {
      block.style.marginTop = `${headerMobile.offsetHeight}px`;

      window.addEventListener("resize", () => {
        block.style.marginTop = `${headerMobile.offsetHeight}px`;
      });
    });

  } else {
    contentBlocks.forEach((block) => {
      block.style.marginTop = `${header.offsetHeight}px`;

      window.addEventListener("resize", () => {
        block.style.marginTop = `${header.offsetHeight}px`;
      });
    });
  }
}

export { marginHeader as m };
//# sourceMappingURL=marginHeader-3930422d.js.map
