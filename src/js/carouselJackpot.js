function carouselJackpot() {
	var carousel = new Splide( '.jackpot__carousel', {
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

export default carouselJackpot;