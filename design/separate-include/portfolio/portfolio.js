//calendarDatepicker(blog)
jQuery(function($){
	var $window = $(window),
		$body = $('body'),
		$html = $('html'),
		blocks = {
			ttPortfolioContent: $('.tt-portfolio-content'),
			ttPortfolioMasonry: $('.tt-portfolio-masonry'),
		};
	// portfolio mobile click
	if (blocks.ttPortfolioContent.length && is_touch_device()) {
		ttPortfolioContentMobile();
	};

	var ttCachedWidth = $window.width();
		$window.on('resize', function () {
			var newWidth = $window.width();
			if(newWidth !== ttCachedWidth){
				ttCachedWidth = newWidth;
				var ttwindowWidth = window.innerWidth || $window.width();

				// portfolio mobile click
				if (blocks.ttPortfolioContent.length && is_touch_device()) {
					ttPortfolioContentMobile();
				};

		}
	});
	$window.on('load', function (){
		var ttwindowWidth = window.innerWidth || $window.width();

		if (blocks.ttPortfolioMasonry.length) {
			gridPortfolioMasonr();
			initPortfolioPopup();
		};
	});

	// Portfolio
	function gridPortfolioMasonr() {
		// init Isotope
		var $grid = blocks.ttPortfolioMasonry.find('.tt-portfolio-content').isotope({
				itemSelector: '.element-item',
				layoutMode: 'masonry',
		});
		// layout Isotope after each image loads
		$grid.imagesLoaded().progress( function() {
			$grid.isotope('layout').addClass('tt-show');
		});
		// filter functions
		var ttFilterNav =  blocks.ttPortfolioMasonry.find('.tt-filter-nav');
		if (ttFilterNav.length) {
				var filterFns = {
						ium: function() {
							var name = $(this).find('.name').text();
							return name.match(/ium$/);
						}
				};
				// bind filter button click
			 ttFilterNav.on('click', '.button', function() {
						var filterValue = $(this).attr('data-filter');
						filterValue = filterFns[filterValue] || filterValue;
						$grid.isotope({
							filter: filterValue
						});
						$(this).addClass('active').siblings().removeClass('active');
				});
		};
		//add item
		var isotopShowmoreJs = $('.isotop_showmore_js .btn'),
				ttAddItem = $('.tt-add-item');
		if (isotopShowmoreJs.length && ttAddItem.length) {
				isotopShowmoreJs.on('click', function(e) {
						e.preventDefault();
						$.ajax({
								url: 'separate-include/portfolio/ajax_portfolio.html',
								success: function(data) {
									var $item = $(data);
									ttAddItem.append($item);
									$grid.isotope('appended', $item);
									initPortfolioPopup();
									adjustOffset();
								}
						});
						function adjustOffset(){
								var offsetLastItem = ttAddItem.children().last().children().offset().top - 180;
								$($body, $html).animate({
										scrollTop: offsetLastItem
								}, 500);
						};
						return false;
				 });
		};
	};
	function initPortfolioPopup() {
		var objZoom = $('.tt-portfolio-masonry .tt-btn-zomm');
		objZoom.magnificPopup({
				type: 'image',
				gallery: {
						enabled: true
				}
		});
	};

	// portfolio mobile click
	function ttPortfolioContentMobile(){
		blocks.ttPortfolioContent.on('click', 'figure img', function() {
			$(this).closest(".tt-portfolio-content").find('figure').removeClass('gallery-click');
			$(this).closest("figure").addClass('gallery-click');
		});
	};
	function is_touch_device() {
			return !!('ontouchstart' in window) || !!('onmsgesturechange' in window);
	};
});