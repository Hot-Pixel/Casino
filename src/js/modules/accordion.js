function accordion() {
  const accordions = document.querySelectorAll("[data-accordion]");

  accordions.forEach((accordion) => {
    const trigger = accordion.querySelector("[data-accordion-trigger]");
    const content = accordion.querySelector("[data-accordion-content]");
    accordion.classList.add("accordion");
    content.classList.add("accordion__content");
    trigger.addEventListener("click", () => {
      if(accordion.classList.contains("accordion--active")) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
      accordion.classList.toggle("accordion--active");
    });
  });
}

export default accordion;
