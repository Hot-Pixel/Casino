function historyNavBar() {
  const historyNav = document.querySelectorAll(".history__nav");
  const historyBlock = document.querySelectorAll(".block");

  historyNav.forEach((nav) => {
    if(nav.getAttribute('href') !== "#") return;

    nav.addEventListener("click", (e) => {
      historyBlock.forEach((block) => {
        block.classList.remove("active-block");
      });
      historyNav.forEach((nav) => {
        nav.classList.remove("is-active");
      });
      e.currentTarget.classList.add("is-active");
      let dataBlock = e.currentTarget.dataset.block;
      let target = document.querySelector(dataBlock);
      target.classList.add("active-block");
    });
  });
}

export default historyNavBar;