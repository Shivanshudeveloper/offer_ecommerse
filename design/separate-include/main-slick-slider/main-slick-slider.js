jQuery(function($){
	var blocks = {
		mainSliderSlick: $('.mainSliderSlick')
	};
	if (blocks.mainSliderSlick.length) {
		mainSliderSlick();
	};
	function mainSliderSlick() {
			var $el = blocks.mainSliderSlick;
			$el.find('.slide').first().imagesLoaded({
				background: true
			}, function(){
				setTimeout(function () {
							$el.parent().find('.loading-content').addClass('disable');
				}, 1200);
			});
			$el.on('init', function (e, slick) {
				var $firstAnimatingElements = $('div.slide:first-child').find('[data-animation]');
				doAnimations($firstAnimatingElements);
			});
			$el.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
				var $currentSlide = $('div.slide[data-slick-index="' + nextSlide + '"]');
				var $animatingElements = $currentSlide.find('[data-animation]');
				doAnimations($animatingElements);
			});
			$el.slick({
					arrows: false,
					dots: true,
					autoplay: true,
					autoplaySpeed: 5500,
					fade: true,
					speed: 1000,
					pauseOnHover: false,
					pauseOnDotsHover: true,
					responsive: [{
							breakpoint: 1025,
							settings: {
								dots: true,
								arrows: false
							}
					}]
			});
	};
	function doAnimations(elements) {
			var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
			elements.each(function () {
					var $this = $(this);
					var $animationDelay = $this.data('animation-delay');
					var $animationType = 'animated ' + $this.data('animation');
					$this.css({
						'animation-delay': $animationDelay,
						'-webkit-animation-delay': $animationDelay
					});
					$this.addClass($animationType).one(animationEndEvents, function () {
						$this.removeClass($animationType);
					});
					if ($this.hasClass('animate')) {
						$this.removeClass('animation');
					}
			});
	};
	dataBg('#tt-pageContent [data-bg]');
	function dataBg(el) {
		$(el).each(function () {
			var $this = $(this),
				bg = $this.attr('data-bg');
			$this.css({
				'background-image': 'url(' + bg + ')'
			});
		});
	};
});