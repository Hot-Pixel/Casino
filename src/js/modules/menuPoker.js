function menuPoker() {
  const menuBtns = document.querySelectorAll(".menuPoker__btn");
  menuBtns.forEach((btn) => {

    btn.addEventListener("click", (e) => {

      menuBtns.forEach((btn) => {
        btn.classList.remove("is-active");
      });

      e.currentTarget.classList.toggle("is-active");

      const pokerSect = document.querySelectorAll(".poker__section");
      pokerSect.forEach( sect => {
        sect.classList.remove("tab-on");
      });

      if(e.currentTarget.classList.contains("menuPoker-home")) {
        const homeSect = document.querySelector(".poker__home");
        homeSect.classList.add("tab-on")
      } else if(e.currentTarget.classList.contains("menuPoker-pc")) {
        const pcSect = document.querySelector(".poker__pc");
        pcSect.classList.add("tab-on")
      } else if(e.currentTarget.classList.contains("menuPoker-mobile")) {
        const mobileSect = document.querySelector(".poker__mobile");
        mobileSect.classList.add("tab-on")
      } else if(e.currentTarget.classList.contains("menuPoker-tour")) {
        const tourSect = document.querySelector(".poker__tour");
        tourSect.classList.add("tab-on")
      }

    });


  });
}

export default menuPoker;
