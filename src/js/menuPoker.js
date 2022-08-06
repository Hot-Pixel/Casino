function menuPoker() {
  const menuBtns = document.querySelectorAll(".menuPoker__btn");
  menuBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      menuBtns.forEach((btn) => {
        btn.classList.remove("is-active");
      });
      e.currentTarget.classList.toggle("is-active");
    });
  });
}

export default menuPoker;
