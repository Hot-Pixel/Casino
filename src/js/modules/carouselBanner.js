import { Splide } from "@splidejs/splide";

function carouselBanner() {
  getList()
    .then(data => {
      generateSlides(data);
      initSplide();
    });

  function generateSlides(data) {
    const template = document.getElementById("banner-slide-template");
    const target = document.querySelector('.splide__list');
    data.forEach(slide => {
      const clone = template.content.firstElementChild.cloneNode(true);
      clone.innerHTML = clone.innerHTML
        .replaceAll('{title}', slide.txt.title)
        .replaceAll('{body}', slide.txt.description)
        .replaceAll('{link}', slide.url)
        .replaceAll('{cta}', slide.txt.button)
        .replaceAll('{imgDesk}', slide.img.bg)
        .replaceAll('{imgMobile}', slide.img.icon)
        ;
      target.appendChild(clone);
    })
  }

  function initSplide() {
    var carousel = new Splide(".bannerCarousel .splide", {
      perPage: 1,
      arrow: true,
      pagination: false,
    });

    carousel.mount();
  }
}


export default carouselBanner;