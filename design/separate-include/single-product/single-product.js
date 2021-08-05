jQuery(function($){
	var $document = $(document),
		$window = $(window),
		$body = $('body'),
		$html = $('html'),
		$ttPageContent = $('tt-pageContent'),
		ttwindowWidth = window.innerWidth || $window.width(),
		blocks = {
			ttProductItem: $ttPageContent.find('.tt-product, .tt-product-design02'),
			ttAirSticky: $('.airSticky'),
			ttCollapseBlock: $('.tt-collapse-block'),
			modalVideoProduct: $('#modalVideoProduct'),
			ttCollapseBlock: $('.tt-collapse-block')
		};


	var ttCachedWidth = $window.width();
	$window.on('resize', function () {
		var newWidth = $window.width();
		if(newWidth !== ttCachedWidth){
			ttCachedWidth = newWidth;
			var ttwindowWidth = window.innerWidth || $window.width();

			// if (blocks.ttAirSticky.length) {
			// 	ttAirSticky(ttwindowWidth);
			// };
		}
	});

	var elevateZoomWidget = {
		scroll_zoom: true,
		class_name: '.zoom-product',
		thumb_parent: $('#smallGallery'),
		scrollslider_parent: $('.slider-scroll-product'),
		checkNoZoom: function(){
			return $(this.class_name).parent().parent().hasClass('no-zoom');
		},
		init: function(type){
			var _ = this;
			var currentW = window.innerWidth || $(window).width();
			var zoom_image = $(_.class_name);
			var _thumbs = _.thumb_parent;
			_.initBigGalleryButtons();
			_.scrollSlider();

			if(zoom_image.length == 0) return false;
			if(!_.checkNoZoom()){
				var attr_scroll = zoom_image.parent().parent().attr('data-scrollzoom');
				attr_scroll = attr_scroll ? attr_scroll : _.scroll_zoom;
				_.scroll_zoom = attr_scroll == 'false' ? false : true;
				currentW > 575 && _.configureZoomImage();
				_.resize();
			}

			if(_thumbs.length == 0) return false;
			var thumb_type = _thumbs.parent().attr('class').indexOf('-vertical') > -1 ? 'vertical' : 'horizontal';
			_[thumb_type](_thumbs);
			_.setBigImage(_thumbs);
		},
		configureZoomImage: function(){
			var _ = this;
			$('.zoomContainer').remove();
			var zoom_image = $(this.class_name);
			zoom_image.each(function(){
				var _this = $(this);
				var clone = _this.removeData('elevateZoom').clone();
				_this.after(clone).remove();
			});
			setTimeout(function(){
				$(_.class_name).elevateZoom({
					gallery: _.thumb_parent.attr('id'),
					zoomType: "inner",
					scrollZoom: Boolean(_.scroll_zoom),
					cursor: "crosshair",
					zoomWindowFadeIn: 300,
					zoomWindowFadeOut: 300
				});
			}, 100);
		},
		resize: function(){
			var _ = this;
			$(window).resize(function(){
				var currentW = window.innerWidth || $(window).width();
				if(currentW <= 575) return false;
				_.configureZoomImage();
			});
		},
		horizontal: function(_parent){
			_parent.slick({
				infinite: true,
				dots: false,
				arrows: true,
				slidesToShow: 6,
				slidesToScroll: 1,
				responsive: [{
					breakpoint: 1200,
					settings: {
						slidesToShow: 4,
						slidesToScroll: 1
					}
				},
				{
					breakpoint: 992,
					settings: {
						slidesToShow: 4,
						slidesToScroll: 1
					}
				}]
			});
		},
		vertical: function(_parent){
			_parent.slick({
				vertical: true,
				infinite: false,
				slidesToShow: 5,
				slidesToScroll: 1,
				verticalSwiping: true,
				arrows: true,
				dots: false,
				centerPadding: "0px",
				customPaging: "0px",
				responsive: [{
					breakpoint: 1200,
					settings: {
						slidesToShow: 5,
						slidesToScroll: 1
					}
				},
				{
					breakpoint: 992,
					settings: {
						slidesToShow: 5,
						slidesToScroll: 1
					}
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 5,
						slidesToScroll: 1
					}
				}]
			});
			/*
				add js
			*/
			_parent.on('afterChange', function (e, slick, currentSlide, nextSlide) {
				arrowVisibility();
			});
			function arrowVisibility(){
				var objVisibility = $('#smallGallery').find('.slick-disabled'),
					counterVisibility = objVisibility.length;
				if(counterVisibility > 0){
					var definitionBtn = objVisibility.attr('aria-label');
					if(definitionBtn == "Previous"){
						$("#custom-product-item .slick-prev").addClass('slick-disabled');
					} else if(definitionBtn == "Next"){
						$("#custom-product-item .slick-next").addClass('slick-disabled');
					};
				} else if(counterVisibility == 0){
					$("#custom-product-item .slick-disabled").removeClass('slick-disabled');
				};
			};
			arrowVisibility();
			var wrapperCustomNav = $('#custom-product-item');
			var quantity = $('#smallGallery .slick-arrow').size();

			if (wrapperCustomNav.length && !$('#smallGallery .slick-arrow').length == 0){
				wrapperCustomNav.addClass('tt-show');
				wrapperCustomNav.find('.slick-next').on('click',function(e) {
					_parent.slick('slickNext');
					changeSrc();
				});
				wrapperCustomNav.find('.slick-prev').on('click',function(e) {
					_parent.slick('slickPrev');
					changeSrc();
				});
			}
			function changeSrc(){
				setTimeout(function() {
					$('#smallGallery').find('.slick-current a').trigger('click');
				}, 200);
			};
			/*
				and add js
			*/
		},
		 initBigGalleryButtons: function(){
						var bigGallery = $('.bigGallery');
						if(bigGallery.length == 0) return false;
						$( 'body' ).on( 'mouseenter', '.zoomContainer',
										function(){        bigGallery.find('button').addClass('show');        }
						).on( 'mouseleave', '.zoomContainer',
										function(){ bigGallery.find('button').removeClass('show'); }
						);
		},
		scrollSlider: function(){
			var _scrollslider_parent = this.scrollslider_parent;
			if(_scrollslider_parent.length == 0) return false;
			_scrollslider_parent.on('init', function(event, slick) {
				_scrollslider_parent.css({ 'opacity': 1 });
			});
			_scrollslider_parent.css({ 'opacity': 0 }).slick({
				infinite: false,
				vertical: true,
				verticalScrolling: true,
				dots: true,
				arrows: false,
				slidesToShow: 1,
				slidesToScroll: 1,
				responsive: [{
					breakpoint: 1200,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				},
				{
					breakpoint: 992,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}]
			}).mousewheel(function(e) {
				e.preventDefault();
				e.deltaY < 0 ? $(this).slick('slickNext') : $(this).slick('slickPrev');
			});
		},
		setBigImage: function(_parent){
			var _ = this;
			_parent.find('a').on('click',function(e) {
				_.checkNoZoom() && e.preventDefault();
				var zoom_image = $(_.class_name);
				var getParam = _.checkNoZoom() ? 'data-image' : 'data-zoom-image';
				var setParam = _.checkNoZoom() ? 'src' : 'data-zoom-image';
				var big_image = $(this).attr(getParam);
				zoom_image.attr(setParam, big_image);

				if(!_.checkNoZoom()) return false;
				_parent.find('.zoomGalleryActive').removeClass('zoomGalleryActive');
				$(this).addClass('zoomGalleryActive');
			});
		}
	};
	elevateZoomWidget.init();

	if (blocks.modalVideoProduct.length) {
		ttVideoPopup();
	};
	//popup on pages product single
		function ttVideoPopup() {
			blocks.modalVideoProduct.on('show.bs.modal', function(e) {
					var relatedTarget = $(e.relatedTarget),
							attr = relatedTarget.attr('data-value'),
							attrPoster = relatedTarget.attr('data-poster'),
							attrType = relatedTarget.attr('data-type');

					if(attrType === "youtube" || attrType === "vimeo" || attrType === undefined){
						$('<iframe src="'+attr+'" allowfullscreen></iframe>').appendTo($(this).find('.modal-video-content'));
					};

					if(attrType === "video"){
						$('<div class="tt-video-block"><a href="#" class="link-video"></a><video class="movie" src="'+attr+'" poster="'+attrPoster+'" allowfullscreen></video></div>').appendTo($(this).find('.modal-video-content'));

					};
				 ttVideoBlock();
			}).on('hidden.bs.modal', function () {
					$(this).find('.modal-video-content').empty();
			});
	};

	//tt-collapse-block(pages product single)
	if (blocks.ttCollapseBlock.length) {
		ttCollapseBlock();
	};
	function ttCollapseBlock() {
		blocks.ttCollapseBlock.each( function () {
			var obj = $(this),
					objOpen = obj.find('.tt-item.active'),
					objItemTitle = obj.find('.tt-item .tt-collapse-title');

			objOpen.find('.tt-collapse-content').slideToggle(200);

			objItemTitle.on('click', function () {
					$(this).next().slideToggle(200).parent().toggleClass('active');
			});
		});
	};

	//desktop btn zoom
	$body.on('click', '.tt-product-single-img .tt-btn-zomm', function (e) {
		var objSmallGallery = $('#smallGallery');
		objSmallGallery.find('a').each(function(){
				var dataZoomImg = $(this).attr('data-zoom-image');
				if(dataZoomImg.length){
					$(this).closest('li').append("<a class='link-magnific-popup' href='#'></a>").find('.link-magnific-popup').attr('href', dataZoomImg);
					if($(this).hasClass('zoomGalleryActive')){
						$(this).closest('li').find('.link-magnific-popup').addClass('zoomGalleryActive');
					};
				};
		});
		objSmallGallery.addClass('tt-magnific-popup').find('.link-magnific-popup').magnificPopup({
			type: 'image',
				gallery: {
						enabled: true,
						tCounter: '<span class="mfp-counter"></span>'
				},
				callbacks: {
					close: function() {
						setTimeout(function() {
								objSmallGallery.removeClass('tt-magnific-popup').find('.link-magnific-popup').remove();
						}, 200);

					}
				}
		});
		objSmallGallery.find('.link-magnific-popup.zoomGalleryActive').trigger('click');
	});
	function ttVideoBlock() {
		$('.tt-video-block').on('click', function (e) {
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
	ttVideoBlock();

	//zoom mobile
	function zoomMobile(){
		$('body').on('click', '#zoom-mobile__slider div > img',  function() {
			var accountQuantity = $(this).closest('.slick-slide').data("slick-index");

			$('body').addClass('mm-open');

			$('#zoom-mobile__layout').addClass('active');

			var imgTotal = $("#zoom-mobile__slider div > img").length;
			imgTotal --;
			$.each($("#zoom-mobile__slider div > img"), function(index){
				var arrayImg = $(this).attr("src");
				if(index == imgTotal) return false;
				$('#tt-fotorama').append('<img src="' + arrayImg + '" alt="" >');
			});
			// $('#tt-fotorama').fotorama({
			// 	data: [
			// 		{img: 'images/product/product-01.jpg'},
			// 		{img: 'images/product/product-01-02.jpg'},
			// 		{img: 'images/product/product-01-03.jpg'},
			// 		{img: 'images/product/product-01-04.jpg'},
			// 	]
			// });

			var $fotoramaDiv = $('#tt-fotorama').fotorama();
			$fotoramaDiv.data('fotorama').show(accountQuantity);
			return false;
		});
		$('body').on('click', '.zoom-mobile__close',  function() {
			$('body').removeClass('mm-open');
			$('#zoom-mobile__layout').removeClass('active');
			return false;
		});
	};
	zoomMobile();


	//sticky(product-03.html)
	if (blocks.ttAirSticky.length) {
		ttAirSticky(ttwindowWidth);
	};
	function ttAirSticky(ttwindowWidth){
		var airStickyObj =  blocks.ttAirSticky,
			tabObj =  blocks.ttCollapseBlock.find('.tt-collapse-title');

		if(ttwindowWidth >= 1024){
			airStickyObj.airStickyBlock({
				debug: false,
				stopBlock: '.airSticky_stop-block',
				offsetTop: 70
			});
		} else if(airStickyObj.hasClass('airSticky_absolute')) {
			airStickyObj.removeClass('airSticky_absolute');
		};
		$document.on('resize scroll', tabObj, function () {
			airStickyObj.trigger('render.airStickyBlock');
		});
		tabObj.on('click', function() {
			setTimeout(function(){
				airStickyObj.trigger('render.airStickyBlock');
			}, 170);
		});
	};
});

