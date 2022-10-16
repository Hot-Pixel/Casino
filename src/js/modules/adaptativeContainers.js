function adaptationModule(selector) {
  let containers = document.querySelectorAll(selector);

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

  window.addEventListener("resize", heightMatch);
}

export default adaptationModule;
