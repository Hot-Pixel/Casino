import { Splide } from "@splidejs/splide";

function carouselLandingA() {

    var carousel = new Splide(".logosLandingA__slider.splide", {
        pagination: false,
        arrows: true,
        perPage: 4,
        padding: 50,
        perMove: 1,
        gap: 50,
        breakpoints: {
        768: {
            perPage: 3,
        },
        576: {
            perPage: 2,
        }
        }
    });

    carousel.mount();
}

export default carouselLandingA;