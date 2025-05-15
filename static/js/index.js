window.HELP_IMPROVE_VIDEOJS = false;

$(document).ready(function() {
    var options = {
			slidesToScroll: 1,
			slidesToShow: 1,
			loop: true,
			infinite: true,
    }

		// Initialize all div with carousel class
    bulmaCarousel.attach('.carousel', options);
})
