function adaptationModule(selector) {

  let containers = document.querySelectorAll(selector);
  if(window.innerWidth > 1280) {
    heightMatch()
  }
  window.addEventListener("resize", heightMatch);

  function heightMatch() {
    let heights = [];
    let highest = 0;

    containers.forEach((cont) => {
      cont.style.height = "fit-content";
      heights.push(cont.offsetHeight);
    });

    heights.forEach((e) => {
      if (highest < e) {
        highest = e;
      }
    });

    containers.forEach((cont) => {
      cont.style.height = `${highest}px`;
    });
  }

}

export default adaptationModule;
