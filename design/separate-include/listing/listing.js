jQuery(function($){
	var	$window = $(window),
		$body = $('body'),
		$html = $('html'),
		$ttPageContent = $('#tt-pageContent'),
		$ttFilterOptions = $('#js-tt-filters-options'),
		$ttLeftColumnAside = $('#js-leftColumn-aside'),
		ttwindowWidth = window.innerWidth || $window.width(),
		blocks = {
			ttCollapse: $ttPageContent.find('.tt-collapse'),
			ttBtnToggle: $ttFilterOptions.find('.tt-btn-toggle a'),
			ttFilterSort: $ttFilterOptions.find('.tt-sort'),
			ttFilterDetachOption: $ttLeftColumnAside.find('.tt-filter-detach-option'),
			ttBtnColumnClose: $ttLeftColumnAside.find('.tt-btn-col-close'),
			ttProductListing: $ttPageContent.find('.tt-product-listing'),
			ttProductItem: $ttPageContent.find('.tt-product, .tt-product-design02'),
			ttProductDesign02: $ttPageContent.find('.tt-product-design02'),
			ttProductDesign01: $ttPageContent.find('.tt-product'),
		};

	if (blocks.ttCollapse.length) {
		ttCollapse();
	};
	$window.on('load', function () {
		var ttwindowWidth = window.innerWidth || $window.width();

		if ($ttFilterOptions.length) {
			ttFilterLayout(ttwindowWidth);
		};
	});

	var ttCachedWidth = $window.width();
	$window.on('resize', function () {
		var newWidth = $window.width();
		if(newWidth !== ttCachedWidth){
			ttCachedWidth = newWidth;
			if ($ttFilterOptions.length) {
				ttFilterLayout(ttwindowWidth);
			};
			if ($ttLeftColumnAside.hasClass('column-open') && $ttLeftColumnAside.length) {
				$ttLeftColumnAside.find('.tt-btn-col-close a').trigger('click');
			};
		}
	});

	// collapseBlock(pages listing) *listing-left-column.html
	function ttCollapse() {
		var item = blocks.ttCollapse,
			itemTitle = item.find('.tt-collapse-title'),
			itemContent = item.find('.tt-collapse-content');

		item.each(function() {
			if ($(this).hasClass('open')) {
				$(this).find(itemContent).slideDown();
			} else {
				 $(this).find(itemContent).slideUp();
			}
		});
		itemTitle.on('click', function(e) {
			e.preventDefault();
			var speed = 300;
			var thisParent = $(this).parent(),
				nextLevel = $(this).next('.tt-collapse-content');
			if (thisParent.hasClass('open')) {
				thisParent.removeClass('open');
				nextLevel.slideUp(speed);
			} else {
				thisParent.addClass('open');
				nextLevel.slideDown(speed);
			}
		})
	};
	// ttFiltersOptions
	$.fn.removeClassFirstPart = function(mask) {
		return this.removeClass(function(index, cls) {
			var re = mask.replace(/\*/g, '\\S+');
			return (cls.match(new RegExp('\\b' + re + '', 'g')) || []).join(' ');
		});
	};

	function ttFilterLayout(ttwindowWidth){
		if($ttFilterOptions.hasClass('desctop-no-sidebar') && !$ttFilterOptions.hasClass('filters-detach-mobile')){
			ttwindowWidth <= 1024 ?  insertMobileCol() : insertFilter();
		};
		if($ttFilterOptions.hasClass('filters-detach-mobile')){
			ttwindowWidth <= 1024 ?  insertMobileCol() : insertFilter();
		};
		if(!$ttFilterOptions.hasClass('desctop-no-sidebar')){
			ttwindowWidth <= 1024 ?  insertMobileCol() : insertFilter();
		};

		function insertMobileCol(){
			var objFilterOptions = blocks.ttFilterSort.find('select').detach();
			blocks.ttFilterDetachOption.find('.filters-row-select').append(objFilterOptions);
		};
		function insertFilter(){
			var objColFilterOptions = blocks.ttFilterDetachOption.find('.filters-row-select select').detach();
			blocks.ttFilterSort.append(objColFilterOptions);
		};

		//active filter detection
		blocks.ttProductListing.removeClassFirstPart("tt-col-*");

		var ttQuantity = $ttFilterOptions.find('.tt-quantity'),
			ttProductItem = blocks.ttProductListing.find('.tt-col-item:first'),
			ttProductItemValue =  (function(){
				if(ttQuantity.length && !ttQuantity.hasClass('tt-disabled')){
					var ttValue = parseInt(ttProductItem.css("flex").replace("0 0", "").replace("%", ""), 10) || parseInt(ttProductItem.css("max-width"), 10);
					return ttValue;
				};
			}()),
			ttGridSwitch = $ttFilterOptions.find('.tt-grid-switch');


		if(ttProductItemValue == 16){
			ttСhangeclass(ttQuantity, '.tt-col-six');
		} else if(ttProductItemValue == 25){
			ttСhangeclass(ttQuantity, '.tt-col-four');
		} else if(ttProductItemValue == 33){
			ttСhangeclass(ttQuantity, '.tt-col-three');
		} else if(ttProductItemValue == 50){
			ttСhangeclass(ttQuantity, '.tt-col-two');
		} else if(ttProductItemValue == 100){
			ttСhangeclass(ttQuantity, '.tt-col-one');
		};

		function ttСhangeclass(ttObj, ttObjvalue){
			ttObj.find(ttObjvalue).addClass('active').siblings().removeClass('active');
			ttwindowWidth <= 1024 ?  ttShowIconMobile(ttObj, ttObjvalue) : ttShowIconDesctop(ttObj, ttObjvalue);
		};

		function ttShowIconDesctop(ttObj, ttObjvalue){
			ttObj.find('.tt-show').removeClass('tt-show');
			ttObj.find('.tt-show-siblings').removeClass('tt-show-siblings');

			var $this = ttObj.find(ttObjvalue);
			$this.addClass('tt-show');

			$this.next().addClass('tt-show-siblings');
			$this.prev().addClass('tt-show-siblings');
			var quantitySiblings = $('.tt-quantity .tt-show-siblings').length;
			if(quantitySiblings === 1){
				ttObj.find('.tt-show-siblings').prev().addClass('tt-show-siblings');
			};
		};
		function ttShowIconMobile(ttObj, ttObjvalue){
			ttObj.find('.tt-show').removeClass('tt-show');
			ttObj.find('.tt-show-siblings').removeClass('tt-show-siblings');

			var $this = ttObj.find(ttObjvalue);
			$this.addClass('tt-show');
			$this.prev().addClass('tt-show-siblings');
		};

		//click buttons filter
		ttQuantity.on('click', 'a', function(e) {
			e.preventDefault();
			if(ttQuantity.hasClass('tt-disabled')){
				blocks.ttProductListing.removeClass('tt-row-view').find('.tt-col-item > div').removeClass('tt-view');
				ttQuantity.removeClass('tt-disabled');
				ttGridSwitch.removeClass('active');
				ttOverflowProduct();
			};

			ttQuantity.find('a').removeClass('active');
			var ttActiveValue = $(this).addClass('active').attr('data-value');
			blocks.ttProductListing.removeClassFirstPart("tt-col-*").addClass(ttActiveValue);
			ttProductSmall();
		});
	};

	$ttFilterOptions.find('.tt-grid-switch').on('click', function(e){
		e.preventDefault();
		$(this).toggleClass('active');
		blocks.ttProductListing.toggleClass('tt-row-view').find('.tt-col-item > div').toggleClass('tt-view');
		$ttFilterOptions.find('.tt-quantity').toggleClass('tt-disabled');
	});


	// Slide Column *listing-left-column.html
	if ($ttLeftColumnAside && blocks.ttBtnColumnClose && blocks.ttBtnToggle) {
		ttToggleCol();
	};
	function ttToggleCol() {
		var $btnClose = $ttLeftColumnAside.find('.tt-btn-col-close a');

		$('.tt-btn-toggle').on('click', function (e) {
			e.preventDefault();
			var ttScrollValue = $body.scrollTop() || $html.scrollTop();
			$ttLeftColumnAside.toggleClass('column-open').perfectScrollbar();
			$body.css("top", - ttScrollValue).addClass("no-scroll").append('<div class="modal-filter"></div>');
			var modalFilter = $('.modal-filter').fadeTo('fast',1);
			if (modalFilter.length) {
				modalFilter.on('click', function(){
						$btnClose.trigger('click');
				})
			}
			return false;
		});
		blocks.ttBtnColumnClose.on('click', function(e) {
			e.preventDefault();
			$ttLeftColumnAside.removeClass('column-open').perfectScrollbar('destroy');
			var top = parseInt($body.css("top").replace("px", ""), 10) * -1;
			$body.removeAttr("style").removeClass("no-scroll").scrollTop(top);
			$html.removeAttr("style").scrollTop(top);
			$(".modal-filter").off().remove();
		});
	};
	// product Small
	function ttProductSmall(){
			var currentW = parseInt(blocks.ttProductItem.width(), 10),
					objProduct = $(".tt-product-design02");
			currentW <= 210 ? objProduct.addClass("tt-small") : objProduct.removeClass("tt-small");
	};
});