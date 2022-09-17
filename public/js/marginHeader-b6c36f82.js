const popUpCloseBtn = document.querySelector(".popUpBalance__closeBtn");
const popUpOpenBtn = document.querySelector(".popUpBalance__openBtn");
const popUpMenu = document.querySelector(".popUpBalance");

function popUpSaldo() {
  popUpOpenBtn.addEventListener("click", () => {
    popUpMenu.style.display = "block";
  });

  popUpCloseBtn.addEventListener("click", () => {
    popUpMenu.style.display = "none";
  });
}

function marginHeader() {
  const header = document.querySelector(".header");
  const headerMobile = document.querySelector(".header__mobile--top");
  const contentBlock = document.querySelector(".has-header");

  if( window.innerWidth < 1280 ) {

    console.log(headerMobile.offsetHeight);

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

export { marginHeader as m, popUpSaldo as p };
//# sourceMappingURL=marginHeader-b6c36f82.js.map
