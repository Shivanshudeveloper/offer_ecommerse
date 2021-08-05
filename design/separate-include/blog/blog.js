//calendarDatepicker(blog)
jQuery(function($){
	var	$body = $('body'),
		$html = $('html'),
		$ttPageContent = $('#tt-pageContent'),
		$objCalendar = $('#calendarDatepicker'),
		$window = $(window),
		blocks = {
			ttSliderBlogSingle: $ttPageContent.find('.tt-slider-blog-single'),
			ttBlogMasonry: $ttPageContent.find('.tt-blog-masonry'),
			ttVideoBlock: $ttPageContent.find('.tt-video-block'),
		};
	if ($objCalendar.length) {
		$objCalendar.datepicker();
	};

	//blog single post slider
	if (blocks.ttSliderBlogSingle.length) {
		blocks.ttSliderBlogSingle.slick({
			dots: false,
			arrows: false,
			infinite: true,
			speed: 300,
			slidesToShow: 1,
			adaptiveHeight: true
		});
		//total slides
		var ttSlickQuantity = $('.tt-slick-quantity');
		if (ttSlickQuantity.length) {
				ttSlickQuantity.find('.total').html(blocks.ttSliderBlogSingle.slick("getSlick").slideCount);
				blocks.ttSliderBlogSingle.on('afterChange', function(event, slick, currentSlide){
						var currentIndex = $('.slick-current').attr('data-slick-index');
						currentIndex++;
						ttSlickQuantity.find('.account-number').html(currentIndex);
				});
		};
		//button
		var ttSlickButton = $('.tt-slick-button');
		if (ttSlickButton.length) {
				ttSlickButton.find('.slick-next').on('click',function(e) {
						blocks.ttSliderBlogSingle.slick('slickNext');
				});
				ttSlickButton.find('.slick-prev').on('click',function(e) {
						blocks.ttSliderBlogSingle.slick('slickPrev');
				});
		};
	};
	$window.on('load', function () {
		var ttwindowWidth = window.innerWidth || $window.width();
		if (blocks.ttBlogMasonry.length) {
			gridGalleryMasonr();
		};
	});
	// Blog Masonr
	function gridGalleryMasonr() {
		// init Isotope
		var $grid = blocks.ttBlogMasonry.find('.tt-blog-init').isotope({
				itemSelector: '.element-item',
				layoutMode: 'masonry',
		});
		// layout Isotope after each image loads
		$grid.imagesLoaded().progress( function() {
			$grid.isotope('layout').addClass('tt-show');
		});
		// filter functions
		var ttFilterNav =  blocks.ttBlogMasonry.find('.tt-filter-nav');
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
		var isotopShowmoreJs = $('.isotop_showmore_js .btn'),
				ttAddItem = $('.tt-add-item');
		if (isotopShowmoreJs.length && ttAddItem.length) {
				isotopShowmoreJs.on('click', function(e) {
						e.preventDefault();
						$.ajax({
								url: 'separate-include/blog/ajax_post.html',
								success: function(data) {
									var $item = $(data);
									ttAddItem.append($item);
									$grid.isotope('appended', $item);
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

	//video(blog listing)
	if (blocks.ttVideoBlock.length) {
		ttVideoBlock();
	};
	//video
	function ttVideoBlock() {
		$('body').on('click', '.tt-video-block', function (e) {
			e.preventDefault();
			var myVideo = $(this).find('.movie')[0];
			if (myVideo.paused) {
				myVideo.play();
				$(this).addClass('play');
			} else {
				myVideo.pause();
				$(this).removeClass('play');
			}
		});
	};
});