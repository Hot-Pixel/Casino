(function (factory) {
	typeof define === 'function' && define.amd ? define('main', factory) :
	factory();
}((function () { 'use strict';

	var carouselJackpot = new Splide('.js--splide--carousel-jackpot', {
	  type: 'loop',
	  perPage: 3,
	  perMove: 1
	});
	carouselJackpot.mount();

})));
