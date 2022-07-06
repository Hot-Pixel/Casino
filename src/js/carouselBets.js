function carouselBets() {
	var carousel = new Splide( '.js--splide--carousel-bets', {
		type       : 'loop',
		pagination : false,
		perPage    : 5,
		perMove    : 1,
		gap        : 15,
		breakpoints: {
			1600: {
				perPage : 4,
			},
			1200: {
				perPage : 3,
			},
			992: {
				perPage : 2,
			},
		}
	} );
	carousel.mount();
}

export default carouselBets;