function marginHeader() {
  const header = document.querySelector(".header");
  const headerMobile = document.querySelector(".header__mobile--top");
  const contentBlock = document.querySelector(".has-header");

  if( window.innerWidth < 1280 ) {

    console.log(headerMobile.offsetHeight)

    contentBlock.style.marginTop = `${headerMobile.offsetHeight}px`;

    window.addEventListener("resize", () => {
      contentBlock.style.marginTop = `${headerMobile.offsetHeight}px`;
    });

  } else {

    contentBlock.style.marginTop = `${header.offsetHeight}px`;

    window.addEventListener("resize", () => {
      contentBlock.style.marginTop = `${header.offsetHeight}px`;
    });

  }

}

export default marginHeader;
