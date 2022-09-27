const menuHeaderOpenBtn = document.querySelector(".menuHeader__openBtn");
const menuHeaderCloseBtn = document.querySelector(".menuHeader__closeBtn");
const menuHeader = document.querySelector(".menuHeader");

function menuHeaderMobile() {
  menuHeaderOpenBtn.addEventListener("click", () => {
    menuHeader.style.display = "flex";
  });
  menuHeaderCloseBtn.addEventListener("click", () => {
    menuHeader.style.display = "none";
  });
}

export default menuHeaderMobile;