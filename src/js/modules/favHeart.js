function favHeart() {
  const hearts = document.querySelectorAll(".card__content-heart");

  hearts.forEach((heart) => {
    heart.addEventListener("click", () => {
      const item = heart.closest('.gridGames__item, .item');
      const isFav = item.classList.contains("fav");
      item.classList.toggle("fav");
      setFavStatus(item.dataset.gameId, !isFav);
    });
  });

  function setFavStatus(roomId, isFav) {
    let url = '/';
    const params = {
      room: roomId, 
      favourite: isFav ? 1 : 0
    }
    url += new URLSearchParams(params).toString();
    fetch(url)
      .then(res => res.json())
      .catch(error => console.error('Fav error:', error))
  }
}

export default favHeart;
