function favHeart() {
  const hearts = document.querySelectorAll(".card__content-heart");

  hearts.forEach((heart) => {
    heart.addEventListener("click", () => {
      heart.classList.toggle("fav");
      if (heart.classList.contains("fav")) {
        heart.parentElement.parentElement.parentElement.classList.add(
          "favorito"
        );
      } else {
        heart.parentElement.parentElement.parentElement.classList.remove(
          "favorito"
        );
      }
    });
  });
}

export { favHeart as f };
//# sourceMappingURL=favHeart-9f93afda.js.map
