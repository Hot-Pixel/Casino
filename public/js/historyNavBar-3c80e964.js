function historyNavBar() {
  const historyNav = document.querySelectorAll(".history__nav");
  const historyBlock = document.querySelectorAll(".block");

  historyNav.forEach((nav) => {
    nav.addEventListener("click", (e) => {
      historyBlock.forEach((block) => {
        block.classList.remove("active-block");
      });
      historyNav.forEach((nav) => {
        nav.classList.remove("is-active");
      });
      e.currentTarget.classList.add("is-active");
      let dataBlock = e.currentTarget.dataset.block;
      console.log(dataBlock);
      let target = document.querySelector(dataBlock);
      target.classList.add("active-block");
    });
  });
}

export { historyNavBar as h };
//# sourceMappingURL=historyNavBar-3c80e964.js.map
