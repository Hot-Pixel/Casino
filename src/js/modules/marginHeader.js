function marginHeader() {
  const header = document.querySelector(".header");
  const headerMobile = document.querySelector(".header__mobile--top");
  const contentBlocks = document.querySelectorAll(".has-header");
  const userMenus = document.querySelectorAll(".userMenu");
  const popUpMenu = document.querySelector(".popUpBalance");

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

    userMenus.forEach((menu) => {
      menu.style.top = `${header.offsetHeight}px`;
      menu.style.height = `calc(100vh - ${header.offsetHeight}px)`;
    });

    // popUpMenu.style.marginTop = `${header.offsetHeight}px`;
  }

}

export default marginHeader;
