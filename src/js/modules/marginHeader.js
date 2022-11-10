function marginHeader() {
  const header = document.querySelector(".header");
  // const headerMobile = document.querySelector(".header__mobile--top");
  // const contentBlocks = document.querySelectorAll(".has-header");
  const userMenus = document.querySelectorAll(".userMenu");

  marginAction();
  window.addEventListener('resize', marginAction);

  function marginAction() {
    if (window.innerWidth < 1280) {
      // contentBlocks.forEach((block) => {
      //   block.style.paddingTop = `${headerMobile.offsetHeight}px`;
      // });
    } else {
      // contentBlocks.forEach((block) => {
      //   block.style.paddingTop = `${header.offsetHeight}px`;
      // });

      userMenus.forEach((menu) => {
        // menu.style.top = `${header.offsetHeight}px`;
        menu.style.height = `calc(100vh - ${header.offsetHeight}px)`;
      });
    }
  }
}

export default marginHeader;
