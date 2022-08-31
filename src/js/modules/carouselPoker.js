import { Splide } from "@splidejs/splide";

function carouselPoker() {

    var carousel = new Splide(".menuPoker .splide", {
        pagination: false,
        arrows: false,
        perPage: 4,
        padding: { left: 0, right: 100 },
        perMove: 1,
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

export default carouselPoker;
