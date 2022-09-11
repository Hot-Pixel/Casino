const screenExist = document.getElementsByClassName("screens");

window.addEventListener("load", () => {
  if (screenExist.length > 0) {
    heartAction();
  }
  popUpAction();
});

function heartAction() {
  const heartBtn = document.querySelector(".heart");

  heartBtn.addEventListener("click", () => {
    heartBtn.classList.toggle("active");
  });
}

function popUpAction() {
  const popUpCloseBtn = document.querySelector(".popUpBalance__closeBtn");
  const popUpOpenBtn = document.querySelector(".popUpBalance__openBtn");
  const popUpMenu = document.querySelector(".popUpBalance");

  popUpOpenBtn.addEventListener("click", () => {
    popUpMenu.style.display = "block";
  });

  popUpCloseBtn.addEventListener("click", () => {
    popUpMenu.style.display = "none";
  });

  const menuHeaderOpenBtn = document.querySelector(".menuHeader__openBtn");
  const menuHeaderCloseBtn = document.querySelector(".menuHeader__closeBtn");
  const menuHeader = document.querySelector(".menuHeader");

  menuHeaderOpenBtn.addEventListener("click", () => {
    menuHeader.style.display = "flex";
  });
  menuHeaderCloseBtn.addEventListener("click", () => {
    menuHeader.style.display = "none";
  });
}
