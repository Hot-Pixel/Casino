function carouselBets() {
	var carousel = new Splide( '.js--splide--carousel-bets', {
		type       : 'loop',
		pagination : false,
		perPage    : 4,
		perMove    : 1,
		gap        : 15,
		breakpoints: {
			1200: {
				perPage : 2,
			},
		}
	} );
	carousel.mount();
}

export default carouselBets;