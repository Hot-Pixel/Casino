function heartToggle() {
  const heartBtn = document.querySelector(".heart");

  heartBtn.addEventListener("click", () => {
    heartBtn.classList.toggle("active");
  });
}

export default heartToggle;
