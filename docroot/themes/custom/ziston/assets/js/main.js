(function ($) {
	"use strict";
		var $event = $.event,
		$special, resizeTimeout;
		$special = $event.special.debouncedresize = {
			setup: function () {
				$(this).on("resize", $special.handler);
			},
			teardown: function () {
				$(this).off("resize", $special.handler);
			},
			handler: function (event, execAsap) {
				var context = this,
					args = arguments,
					dispatch = function () {
						event.type = "debouncedresize";
						$event.dispatch.apply(context, args);
					};

					if (resizeTimeout) {
						clearTimeout(resizeTimeout);
					}

				execAsap ? dispatch() : resizeTimeout = setTimeout(dispatch, $special.threshold);
			},
		threshold: 150
	};

	//------- OWL carousle init  ---------------
	jQuery(document).ready(function(){
		function init_carousel_owl(){
			$('.init-carousel-owl').each(function(){
				var items = $(this).data('items') ? $(this).data('items') : 5;
				var items_lg = $(this).data('items_lg') ? $(this).data('items_lg') : 4;
				var items_md = $(this).data('items_md') ? $(this).data('items_md') : 3;
				var items_sm = $(this).data('items_sm') ? $(this).data('items_sm') : 2;
				var items_xs = $(this).data('items_xs') ? $(this).data('items_xs') : 1;
				var loop = $(this).data('loop') ? $(this).data('loop') : false;
				var speed = $(this).data('speed') ? $(this).data('speed') : 200;
				var auto_play = $(this).data('auto_play') ? $(this).data('auto_play') : false;
				var auto_play_speed = $(this).data('auto_play_speed') ? $(this).data('auto_play_speed') : false;
				var auto_play_timeout = $(this).data('auto_play_timeout') ? $(this).data('auto_play_timeout') : 6000;
				var auto_play_hover = $(this).data('auto_play_hover') ? $(this).data('auto_play_hover') : true;
				var navigation = $(this).data('navigation') ? $(this).data('navigation') : false;
				var rewind_nav = $(this).data('rewind_nav') ? $(this).data('rewind_nav') : true;
				var pagination = $(this).data('pagination') ? $(this).data('pagination') : false;
				var mouse_drag = $(this).data('mouse_drag') ? $(this).data('mouse_drag') : false;
				var touch_drag = $(this).data('touch_drag') ? $(this).data('touch_drag') : false;
				var fade = $(this).data('fade') ? $(this).data('fade') : false;
				$(this).owlCarousel({
					nav: navigation,
					autoplay: auto_play,
					autoplayTimeout: auto_play_timeout,
					autoplaySpeed: auto_play_speed,
					autoplayHoverPause: auto_play_hover,
					navText: [ '<i class="fi flaticon-left-arrow"></i>', '<i class="fi flaticon-right-arrow-1"></i>' ],
					autoHeight: false,
					loop: loop, 
					dots: pagination,
					rewind: rewind_nav,
					smartSpeed: speed,
					mouseDrag: mouse_drag,
					touchDrag: touch_drag,
					responsive : {
						0 : {
							items: 1,
							nav: false
						},
						600 : {
							items : items_xs,
							nav: false
						},
						768 : {
							items : items_sm,
							nav: false
						},
						992: {
							items : items_md
						},
						1200: {
							items: items_lg
						},
						1400: {
							items: items
						}
					}
				});

				var $target = $(this);

				var total = $target.find('.owl-item.active').length;
				$target.find('.owl-item').removeClass('first');
				$target.find('.owl-item').removeClass('center');
				$target.find('.owl-item').removeClass('last');
				$target.find('.owl-item.active').each(function(index) {
					if (index === 0) {
						$(this).addClass('first')
					}
					if(index === 1){
						$(this).addClass('center')
					}
					if (index === total - 1 && total > 1) {
						$(this).addClass('last')
					}
				})
				
				$target.on('translated.owl.carousel', function(e){
				  	var total = $target.find('.owl-item.active').length;
					$target.find('.owl-item').removeClass('first');
					$target.find('.owl-item').removeClass('center');
					$target.find('.owl-item').removeClass('last');
					$target.find('.owl-item.active').each(function(index) {
						if (index === 0) {
							$(this).addClass('first')
						}
						if(index === 1){
							$(this).addClass('center')
						}
						if (index === total - 1 && total > 1) {
							$(this).addClass('last')
						}
					})
				});
			}); 
		}  

		init_carousel_owl();

		$('.gallery-carousel-center').owlCarousel({
	      center: false,
	      items: 3,
	      loop: true,
	      margin: 2,
	      smartSpeed: 1000,
	      autoplayTimeout: 6000,
	      autoplaySpeed: 1000,
	      autoplay: true, 
	      autoplayHoverPause: true,
	      nav: false,
	      lazyLoad: false,
	      dots: false,
	      responsive : {
	        	0 : {
	          	items: 1,
	        	},
	        	600 : {
	          	items : 2,
	        	},
	        	768 : {
	          	items : 2,
	          	center: false,
	        	},
	        	992: {
	          	items : 2
	        	},
	        	1200: {
	          	items: 4
	        	},
	        	1400: {
	          	items: 4
	        	}
	      }
	   });

		//===== Popup video ============
		$('.popup-video').magnificPopup({
			type: 'iframe',
			fixedContentPos: false
		});

		$('.gallery-popup, .preview-gallery, .gallery-popup--listing').each(function(){
			$(this).magnificPopup({
				delegate: 'a.image-popup', 
				type: 'image',
				gallery: {
					enabled: true
				},
			});
		});

	});

	//===== AOS ============
	var wow = new WOW({
		boxClass:     'wow',     
		animateClass: 'animated', 
		offset:       0,          
		mobile:       false,      
		live:         false,      
	});
	wow.init();

	$(document).ready(function () {
		if ($(window).width() > 780) {
			if ( $.fn.jpreLoader ) {
				var $preloader = $( '.js-preloader' );
				$preloader.jpreLoader({
					autoClose: true,
				}, function() {
					$preloader.addClass( 'preloader-done' );
					$( 'body' ).trigger( 'preloader-done' );
					$( window ).trigger( 'resize' );
				});
			}
		}else{
			$('body').removeClass('js-preloader');
		};

		var $container = $('.post-masonry-style');
		$container.imagesLoaded( function(){
			$container.masonry({
				itemSelector : '.item-masory',
				gutterWidth: 0,
				columnWidth: 1,
			}); 
		});

		$('.gva-search-region .icon').on('click',function(e){
			if($(this).parent().hasClass('show')){
				$(this).parent().removeClass('show');
			}else{
				$(this).parent().addClass('show');
			}
			e.stopPropagation();
		})
		
		$('.gva-user-region .icon').on('click',function(e){
	      if($(this).parent().hasClass('show')){
	        $(this).parent().removeClass('show');
	      }else{
	        $(this).parent().addClass('show');
	      }
	      e.stopPropagation();
	   })

		/*======Offcavas===============*/
		$('#menu-bar').on('click',function(e){
			if($('.gva-offcanvas-mobile').hasClass('show-view')){
				$(this).removeClass('show-view');
				$('.gva-offcanvas-mobile').removeClass('show-view');
			}else{
				$(this).addClass('show-view');
				$('.gva-offcanvas-mobile').addClass('show-view'); 
			}
			e.stopPropagation();
		})

		$('.close-offcanvas').on('click', function(e){
			$('.gva-offcanvas-mobile').removeClass('show-view');
			$('#menu-bar').removeClass('show-view');
		});

		/*========== Click Show Sub Menu ==========*/
		$('.gva-navigation a').on('click','.nav-plus',function(){
			if($(this).hasClass('nav-minus') == false){
				$(this).parent('a').parent('li').find('> ul').slideDown();
				$(this).addClass('nav-minus');
			}else{
				$(this).parent('a').parent('li').find('> ul').slideUp();
				$(this).removeClass('nav-minus');
			}
			return false;
		});

		/* ============ Isotope ==============*/
		if ( $.fn.isotope ) {
			$( '.isotope-items' ).each(function() {
				var _pid = $(this).data('pid');
				var $el = $( this ),
						$filter = $( '.portfolio-filter a.' + _pid ),
						$loop =  $( this );

				$loop.isotope();

				$loop.imagesLoaded(function() {
					$loop.isotope( 'layout' );
				});

				if ( $filter.length > 0 ) {

					$filter.on( 'click', function( e ) {
						e.preventDefault();
						var $a = $(this);
						$filter.removeClass( 'active' );
						$a.addClass( 'active' );
						$loop.isotope({ filter: $a.data( 'filter' ) });
					});
				};
			});
		};

		//==== Customize =====
		$('.gavias-skins-panel .control-panel').click(function(){
			if($(this).parents('.gavias-skins-panel').hasClass('active')){
				$(this).parents('.gavias-skins-panel').removeClass('active');
			}else $(this).parents('.gavias-skins-panel').addClass('active');
		});

		/*-------------Milestone Counter----------*/
		jQuery('.milestone-block').each(function() {
			jQuery(this).appear(function() {
				var $endNum = parseInt(jQuery(this).find('.milestone-number').text());
				jQuery(this).find('.milestone-number').countTo({
					from: 0,
					to: $endNum,
					speed: 4000,
					refreshInterval: 60,
					formatter: function (value, options) {
						value = value.toFixed(options.decimals);
						value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
						return value;
					}
				});
			},{accX: 0, accY: 0});
		});

		/*----------- Animation Progress Bars --------------------*/
		$("[data-progress-animation]").each(function() {
			var $this = $(this);
			$this.appear(function() {
				var delay = ($this.attr("data-appear-animation-delay") ? $this.attr("data-appear-animation-delay") : 1);
				if(delay > 1) $this.css("animation-delay", delay + "ms");
				setTimeout(function() { $this.animate({width: $this.attr("data-progress-animation")}, 800);}, delay);
			}, {accX: 0, accY: -50});
		});

		// ====== mb_YTPlayer video background ==============================
		if (!jQuery.browser.mobile){
			$(".youtube-bg").mb_YTPlayer();
		}

		//======Fixed top Menu Bar==========================================
		if($('.gv-sticky-menu').length > 0){
			$('.gv-sticky-menu').each(function(){
				var sticky = new Waypoint.Sticky({
					element: $(this)[0]
				});
			})
		}

	});

	var animationDimensions = function() {
		var gavias_height = $(window).height();
		$('.bb-container.full-screen').each(function(){
			$(this).css('height', gavias_height);
		});
	}

	$(document).ready(function(){
		if($('.full-screen').length > 0){
			animationDimensions();
		}
	})

	$(window).load(function(){
		$('#gva-preloader').remove();
		if($('.full-screen').length > 0){
			animationDimensions();
		}
	});

	$(window).on("debouncedresize", function(event) {
		if($('.full-screen').length > 0){
		 setTimeout(function() {
				animationDimensions();
			}, 50);
		}
	});

	$(document).ready(function(){
		if (window.innerWidth < 992) {
         $('.map-sticky').trigger("sticky_kit:detach");
     	} else {
         $('.map-sticky').stick_in_parent({
            offset_top: 100,
            inner_scrolling: false
         });
     	}
	});

	$(window).on("debouncedresize", function(event) {
		if (window.innerWidth < 992) {
         $('.map-sticky').trigger("sticky_kit:detach");
     	} else {
         $('.map-sticky').stick_in_parent({
            offset_top: 100,
            inner_scrolling: false
         });
     	}
	});

	$(window).load(function(){
		if($('.block-gavias-sliderlayer, .before-help-region').length > 0){
			var html_help = $('.gav-help-region').html();
			$('.gav-help-region').remove();
			html_help = '<div class="help gav-help-region">' + html_help + '</div>';
			if($('.before-help-region').length > 0){
				$('.before-help-region').first().append(html_help);
			}else if($('.block-gavias-sliderlayer').length > 0){
				$('.block-gavias-sliderlayer').first().after(html_help);
			}
			$('.gav-help-region').show();
		}else{
			var html_help = $('.gav-help-region').html();
			$('.gav-help-region').remove();
			html_help = '<div class="help gav-help-region">' + html_help + '</div>';
			$('#page-main-content').first().before(html_help);
			$('.gav-help-region').show();
		}
	});

})(jQuery);