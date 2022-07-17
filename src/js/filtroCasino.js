var options = {
    valueNames: [
      { data: ["type"] },
      { data: ["provider"] },
      { data: ["fav"] }
    ],
  };

  var casinoGridFilter = new List("casino-filter", options);

  const btnAll = document.querySelector("#casino-all");
  btnAll.addEventListener("click", () => {
    casinoGridFilter.filter();
  });

  const btnJack = document.querySelector("#casino-blackjack");
  btnJack.addEventListener("click", () => {
    casinoGridFilter.filter(function (item) {
      return item.values().type == "blackjack";
    });
  });

  const btnRuleta = document.querySelector("#casino-ruleta");
  btnRuleta.addEventListener("click", () => {
    casinoGridFilter.filter(function (item) {
      return item.values().type == "ruleta";
    });
  });

  const selectCasino = document.querySelector("#casino-provider");

  selectCasino.addEventListener("change", () => {
    if (selectCasino.value == "one") {
      casinoGridFilter.filter(function (item) {
        return item.values().provider == "one";
      });
    } else if (selectCasino.value == "two") {
      casinoGridFilter.filter(function (item) {
        return item.values().provider == "two";
      });
    } else if (selectCasino.value == "three") {
      casinoGridFilter.filter(function (item) {
        return item.values().provider == "three";
      });
    } else if (selectCasino.value == "todos") {
      casinoGridFilter.filter();
    }
  });



  const btnFav = document.querySelector("#casino-fav");
  btnFav.addEventListener("click", () => {
    casinoGridFilter.reIndex();
    casinoGridFilter.filter(function (item) {
      console.log(item.values())
      return item.values().fav === "true";
    });
  });