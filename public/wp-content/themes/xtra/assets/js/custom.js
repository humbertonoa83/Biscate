/* Custom codevz menu - 1.7.6 */
!function(i,e){"use strict";var o,n,r,t,s,a,l,c,h,u=(r="sf-breadcrumb",t="sf-js-enabled",s="sf-with-ul",a="sf-arrows",(n=/^(?![\w\W]*Windows Phone)[\w\W]*(iPhone|iPad|iPod)/i.test(navigator.userAgent))&&i("html").css("cursor","pointer").on("click",i.noop),l=n,c="behavior"in(o=document.documentElement.style)&&"fill"in o&&/iemobile/i.test(navigator.userAgent),h=!!e.PointerEvent,{hide:function(e){if(this.length){var o=m(this);if(!o)return this;var n=!0===o.retainPath?o.$path:"",t=this.find("li."+o.hoverClass).add(this).not(n).removeClass(o.hoverClass).children(o.popUpSelector);if(o.speedOut,e&&t.show(),(o.retainPath=!1)===o.onBeforeHide.call(t))return this;t.hide()}return this},show:function(){var e=m(this);if(!e)return this;var o=this.addClass(e.hoverClass).children(e.popUpSelector);return!1===e.onBeforeShow.call(o)||o.show(),this},destroy:function(){return this.each(function(){var e,o=i(this),n=o.data("sf-options");return!!n&&(e=o.find(n.popUpSelector).parent("li"),clearTimeout(n.sfTimer),d(o,n),p(e),f(o),o.off(".codevzMenu").off(".hoverIntent"),e.children(n.popUpSelector).attr("style",function(e,o){return o.replace(/display[^;]+;?/g,"")}),n.$path.removeClass(n.hoverClass+" "+r).addClass(n.pathClass),o.find("."+n.hoverClass).removeClass(n.hoverClass),n.onDestroy.call(o),void o.removeData("sf-options"))})},init:function(s){return this.each(function(){var e=i(this);if(e.data("sf-options"))return!1;var o,n=i.extend({},i.fn.codevzMenu.defaults,s),t=e.find(n.popUpSelector).parent("li");n.$path=(o=n,e.find("li."+o.pathClass).slice(0,o.pathLevels).addClass(o.hoverClass+" "+r).filter(function(){return i(this).children(o.popUpSelector).hide().show().length}).removeClass(o.pathClass)),e.data("sf-options",n),d(e,n),p(t),f(e),function(e,o){var n="li:has("+o.popUpSelector+")";i.fn.hoverIntent&&!o.disableHI?e.hoverIntent(y,C,n):e.on("mouseenter.codevzMenu",n,y).on("mouseleave.codevzMenu",n,C);var t=h?"pointerdown.codevzMenu":"MSPointerDown.codevzMenu";l||(t+=" touchend.codevzMenu"),c&&(t+=" mousedown.codevzMenu"),e.on("focusin.codevzMenu","li",y).on("focusout.codevzMenu","li",C).on(t,"a",o,M)}(e,n),t.not("."+r).codevzMenu("hide",!0),n.onInit.call(this)})}});function d(e,o){var n=t;o.cssArrows&&(n+=" "+a),e.toggleClass(n)}function p(e){e.children("a").toggleClass(s)}function f(e){var o=e.css("ms-touch-action"),n=e.css("touch-action");n="pan-y"===(n=n||o)?"auto":"pan-y",e.css({"ms-touch-action":n,"touch-action":n})}function v(e){return e.closest("."+t)}function m(e){return v(e).data("sf-options")}function y(){var e=i(this),o=m(e);clearTimeout(o.sfTimer),e.siblings().codevzMenu("hide").end().codevzMenu("show")}function w(e){e.retainPath=-1<i.inArray(this[0],e.$path),this.codevzMenu("hide"),this.parents("."+e.hoverClass).length||(e.onIdle.call(v(this)),e.$path.length&&i.proxy(y,e.$path)())}function C(){var e=i(this),o=m(e);l?i.proxy(w,e,o)():(clearTimeout(o.sfTimer),o.sfTimer=setTimeout(i.proxy(w,e,o),o.delay))}function M(e){var o=i(this),n=m(o),t=o.siblings(e.data.popUpSelector);return!1===n.onHandleTouch.call(t)?this:void(0<t.length&&t.is(":hidden")&&(o.one("click.codevzMenu",!1),"MSPointerDown"===e.type||"pointerdown"===e.type?o.trigger("focus"):i.proxy(y,o.parent("li"))()))}i.fn.codevzMenu=function(e,o){return u[e]?u[e].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof e&&e?i.error("Method "+e+" does not exist on jQuery.fn.codevzMenu"):u.init.apply(this,arguments)},i.fn.codevzMenu.defaults={popUpSelector:"ul,.sf-mega",hoverClass:"sfHover",pathClass:"overrideThisToUse",pathLevels:1,delay:300,easing:"linear",animation:{opacity:"show"},animationOut:{opacity:"hide"},speed:100,speedOut:100,cssArrows:!0,disableHI:!1,onInit:i.noop,onBeforeShow:i.noop,onShow:i.noop,onBeforeHide:i.noop,onHide:i.noop,onIdle:i.noop,onDestroy:i.noop,onHandleTouch:i.noop}}(jQuery,window);

/* Custom theme scripts */
var Codevz = ( function( $ ) {
	"use strict";

	var wind = $( window ),
		body = $( document.body ),
		page = $( 'html, body' ),
		inla = body.find( '.inner_layout' );

	// Custom easing.
	$.extend( $.easing, {
		def: 'easeCodevz',
		easeCodevz: function(x) {
			return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? Math.pow( 2, 20 * x - 10 ) / 2 : ( 2 - Math.pow( 2, -20 * x + 10 ) ) / 2;
		}
	});

	// Codevz callback.
	if ( ! $.fn.codevz ) {

		$.fn.codevz = function( data, callback, timeout ) {

			var a = $( this ), l = a.length, i = 0, x, data = 'xtra-' + data;

			l && $( window ).on( 'scroll.' + data, function() {

				clearTimeout( timeout );

				timeout = setTimeout( function() {

					if ( Codevz.inview( a, 250 ) ) {

						for( i; i < l; i++ ) {

							x = $( a[i] );

							if ( x.data( 'codevz' ) !== data ) {
								callback.apply( x.data( 'codevz', data ), [ x, i ] );
							}

						}

						$( window ).off( 'scroll.' + data );

					}

				}, 10 );

			} );

		}

	}

	return {

		inview: function( e, offset ) {
			var offset 			= offset ? offset : 0, 
				docViewTop 		= wind.scrollTop(),
				docViewBottom 	= docViewTop + wind.height(),
				elemTop 		= e.offset().top,
				elemBottom 		= elemTop + e.height();

			return ( ( elemTop <= docViewBottom + offset ) && ( elemBottom >= docViewTop - offset ) );
		},

		init: function( timeout ) {

			// Header custom shape size.
			body.find( 'div[class*="cz_row_shape_"]' ).codevz( 'row_shape', function( x ) {

				Codevz.heightChanged( x, function() {

					var cls = '.' + ( x.attr( 'class' ) || '' ).replace( /  | /g, '.' ),
						hei = x.height() + 37;

					!x.find( '> style' ).length && x.append( '<style></style>' );

					x.find( '> style' ).html( cls + ' .row:before,' + cls + ' .row:after{width:' + hei + 'px}.elms_row ' + cls + ':before, .elms_row ' + cls + ':after{width:' + hei + 'px}' );

				});

			});

			// Functions on window resize.
			wind.on( 'resize.xtra', function() {

				clearTimeout( timeout );

				timeout = setTimeout( function() {

					// Current window width.
					var wind_width = wind.width();

					// WP 5.x gutenberg ready.
					body.find( '.alignfull' ).each( function( i, x ) {

						var x = $( x ), 
							inla_width = x.parent().width(),
							from_left  = ( ( wind_width - inla_width ) / 2 );

						x.css( { width: wind_width, left: -from_left } );

					});

					// Element: line auto height.
					body.find( '.header_line_1' ).each( function( i, x ) {

						x = $( x );
						x.css( 'height', x.closest( '.row' ).height() || '' );

					});

					// Footer fixed.
					body.css( 'margin-bottom', $( '.cz_fixed_footer' ).height() );

					// Videos iframe auto size.
					body.find( '.cz_iframe, .single iframe, object, embed' ).not( '.wp-embedded-content' ).each( function( i, x, w ) {

						x = $( x );

						x.attr( 'data-aspectRatio', x.height() / x.width() ).removeAttr( 'height width' );
						
						w = x.parent().width();
						x.width( w ).height( w * x.attr( 'data-aspectRatio' ) );

					});

				}, 250 );

			}).trigger( 'resize.xtra' );

			// Posts equality.
			body.find( '.cz_default_loop_grid' ).closest( '.cz_posts_container' ).codevz( 'dlg_equal', function( x ) {
				x.addClass( 'cz_posts_equal' );
			});

			// Widget nav menu dropdown.
			body.find( '.widget_nav_menu .menu-item-has-children > a' ).codevz( 'wnmi', function( x ) {

				if ( ! x.find( '.fa-angle-down' ).length ) {
					x.append( '<i class="fa fa-angle-down"></i>' );
				}

			});

			// Widget nav menu dropdown arrow.
			body.on( 'click', '.widget_nav_menu .menu-item-has-children > a > i', function( e ) {

				$( this ).toggleClass( 'fa-angle-down fa-angle-up' ).closest( 'li' ).find( '> ul' ).slideToggle();

				e.preventDefault();

			// Dropdown menu off screen.
			}).on( 'mouseenter', '.sf-menu .menu-item-has-children', function() {

				var dropdown = $( this ).find( '> ul' ).removeClass( 'cz_open_menu_reverse' ),
					isVisible = dropdown.offset().left + dropdown.width() <= inla.width();

				dropdown[ isVisible ? 'removeClass' : 'addClass' ]( 'cz_open_menu_reverse' );

			});

			// Menus
			body.find( '.sf-menu' ).codevz( 'menu', function( x ) {

				var indicator 	= x.data( 'indicator' ),
					default_ind = x.hasClass( 'offcanvas_menu' ) ? 'fa fa-angle-down' : '',
					indicator 	= indicator ? indicator : default_ind,
					indicator2 	= x.data( 'indicator2' ),
					indicator2 	= indicator2 ? indicator2 : default_ind,
					opa 		= body.find( '.page_content, .page_cover, footer' );

				// Superfish.
				x.codevzMenu({

					onInit: function() {

						// Menu indicators.
						$( '.sf-with-ul, h6', this ).each( function() {

							var en = $( this );

							if ( ! $( '.cz_indicator', en ).length ) {

								if ( $( '.cz_menu_subtitle', en ).length ) {
									$( '.cz_menu_subtitle', en ).before( '<i class="cz_indicator"></i>' );
								} else {
									en.append( '<i class="cz_indicator"></i>' );
								}

							}

							if ( ( indicator && indicator.length ) || ( indicator2 && indicator2.length ) ) {
								$( '.cz_indicator', en ).addClass( ( en.parent().parent().hasClass( 'sf-menu' ) ? indicator : indicator2 ) );
							}

							if ( ! en.parent().find( 'li, div' ).length ) {
								en.find( '.cz_indicator' ).remove();
								en.next( 'ul' ).remove();
							}

							// Empty href.
							if ( ! en.attr( 'href' ) ) {
								en.parent().removeClass( 'current_menu' );
							}

							// If there is no active menu.
							if ( ! x.find( '> .current_menu' ).length ) {

								// Fix: Current active menu in dropdown.
								if ( en.parent().find( '.current_menu' ).length ) {

									setTimeout(function() {
										en.parent().addClass( 'current_menu' );
									}, 1000 );

								}

							}

							// Fix: Keep original current menu in dropdown menu.
							if ( x.find( '.current_menu ul > .current-menu-item' ).length ) {

								x.find( '.current_menu ul > .current-menu-item' ).siblings().removeClass( 'current_menu' );

							}

						});

						// Auto responsive menu items according to window width.
						wind.on( 'resize.responsive_menu', function() {

							$( 'header .cz_menu_default' ).not( '#menu_header_4, .cz-not-three-dots' ).each( function( i ) {

								var en = $( this ),
									parent = en.parent(),
									menu_margin = parseFloat( parent.css( 'margin-left' ) ) + parseFloat( parent.css( 'margin-right' ) ),
									elements = 0;

								setTimeout(function() {

									if ( parent.parent().find( '.cz_menu_default' ).length >= 2 ) {
										return;
									}

									// Reset
									en.append( en.find( '.cz-extra-menus > .sub-menu > li' ) ).find( '.cz-extra-menus' ).remove();

									// Add icon dots
									if ( ! en.find( '.cz-extra-menus' ).length ) {
										var submenu_title = $( '.cz_menu_subtitle' ).text() ? '<span class="cz_menu_subtitle">&nbsp;</span>' : '';
										en.append( '<li class="cz-extra-menus cz"><a href="#" class="sf-with-ul"><span>&nbsp;<i class="fa czico-055-three cz-extra-menus" style="margin:0"></i>&nbsp;</span>' + submenu_title + '</a><ul class="sub-menu"></ul></li>');
									}

									var nw = en.find( '.cz-extra-menus' ), 
										nw_ul = nw.find( '> ul' );

									nw.hide().prev().addClass( 'cz-last-child' );

									// Get elements width
									en.parent().parent().find( '.cz_elm' ).not( parent ).each(function() {

										elements += $( this ).outerWidth() + parseFloat( $( this ).css( 'margin-left' ) ) + parseFloat( $( this ).css( 'margin-right' ) );

									});

									// Move back to parent
									nw_ul.find( '> li' ).appendTo( en );

									// Move to hidden menu
									$( en.find( '> li' ).not( '.cz-extra-menus' ).get().reverse() ).each(function() {

										var container = en.closest( '.have_center' ).length ? parent.parent().parent().outerWidth() : parent.parent().outerWidth();

										if ( ( parent.outerWidth() + menu_margin ) + elements + 25 >= container ) {
											$( this ).prependTo( nw_ul );
											nw.show();
										}

									});

								}, 250 );

							});

						}).trigger( 'resize.responsive_menu' );

					},
					onBeforeShow: function() {

						var x = $( this );

						// Sub menu.
						if ( x.hasClass('sub-menu') ) {

							// Check if mega menu is fullwide
							if ( x.parent().hasClass( 'cz_megamenu_width_fullwide' ) ) {

								var megamenu_row = body,
									megamenu_row_offset = megamenu_row.offset().left,
									megamenu_row_width = megamenu_row.width();

								x.attr( 'style', x.attr( 'style' ) + 'width: ' + wind.width() + 'px;left:' + ( megamenu_row_offset - x.parent().offset().left ) + 'px;margin-right:0;margin-left:0;' );
							
							}

							// Sub-menu styling
							if ( x.parent().data( 'sub-menu' ) ) {
								setTimeout(function() {
									x.attr( 'style', x.attr( 'style' ) + x.parent().data( 'sub-menu' ) );
								}, 50 );
							}

							// Megamenu
							if ( x.parent().hasClass( 'cz_parent_megamenu' ) ) {
								x.addClass( 'cz_megamenu_' + $( '> .cz', x ).length ).find( 'ul' ).addClass( 'cz_megamenu_inner_ul clr' );
							}

							// Megamenu full row
							if ( x.parent().hasClass( 'cz_megamenu_width_full_row' ) ) {

								var megamenu_row = $( '.row' ),
									megamenu_row_offset = megamenu_row.offset().left,
									megamenu_row_width = megamenu_row.width();

								if ( x.closest( '.cz-extra-menus' ).length ) {

									megamenu_row_width = megamenu_row_width - ( megamenu_row.width() - x.parent().offset().left + 10 );

								}

								x.attr( 'style', x.attr( 'style' ) + 'width: ' + megamenu_row_width + 'px;left:' + ( megamenu_row_offset - x.parent().offset().left ) + 'px;' );

							}

						}

						if ( x.closest('.fixed_side').length ) {
							var pwidth = x.parent().closest( '.sub-menu' ).length ? '.sub-menu' : '.sf-menu',
								ff_pos = $( '.fixed_side' ).hasClass( 'fixed_side_left' ) ? 'left' : 'right';
							x.css( ff_pos, x.closest( pwidth ).width() );
						}

						setTimeout( function() {

							// Lazyload image in dropdown menus.
							$( window ).trigger( 'scroll.lazyload' );

						}, 500 );

					}

				});

			});

			// Fix mobile menu icon.
			body.find( 'i.icon_mobile_offcanvas_menu' ).removeClass( 'hide' );

			// Dropdown Menu
			body.on( 'click', '.icon_dropdown_menu', function( e ) {

				var x = $( this ),
					pos = x.position(),
					nav = x.parent().find('.sf-menu'),
					row = $( this ).closest('.row').height(),
					offset = ( ( inla.outerWidth() + inla.offset().left ) - x.offset().left );

				nav.fadeToggle( 'fast' );

				body.on( 'click.cz_idm', function(e) {
					nav.fadeOut( 'fast' );
					body.off( 'click.cz_idm' );
				});

				$( '.cz', nav ).on( 'hover', function(e) {
					e.stopPropagation();
				}).off( 'click' ).on( 'click', function(e) {
					if ( $( e.target ).hasClass( 'cz_indicator' ) ) {
						$( this ).closest( 'li' ).find('> ul').fadeToggle( 'fast' );
						e.preventDefault();
						e.stopPropagation();
					}
				});

				e.stopPropagation();

			// Open Menu Horizontal
			}).on( 'click', '.icon_open_horizontal', function( e ) {

				var x = $( this ),
					pos = x.position(),
					nav = x.parent().find('.sf-menu'),
					row = $( this ).closest('.row').height(),
					offset = ( ( inla.outerWidth() + inla.offset().left ) - x.offset().left );

				nav.fadeToggle( 'fast' );

				Codevz.showOneByOne( $( '> .cz', nav ), 100, ( nav.hasClass( 'inview_left' ) ? 'left' : 'right' ) );

				body.on( 'click.cz_ioh', function(e) {
					nav.fadeOut( 'fast' );
					body.off( 'click.cz_ioh' );
				});

				e.stopPropagation();

			// Mobile Menu
			}).on( 'click', 'i.icon_mobile_offcanvas_menu', function() {

				var x = $( this );

				if ( ! x.hasClass( 'done' ) ) {

					Codevz.offCanvas( x.addClass( 'done' ), 1 );

					var ul_offcanvas = $( 'ul.offcanvas_area' ),
						indicator 	= ul_offcanvas.data( 'indicator' ),
						default_ind = ul_offcanvas.hasClass( 'offcanvas_menu' ) ? 'fa fa-angle-down' : '',
						indicator 	= indicator ? indicator : default_ind,
						indicator2 	= ul_offcanvas.data( 'indicator2' ),
						indicator2 	= indicator2 ? indicator2 : default_ind;

					// Add mobile menus indicator
					if ( indicator.length || indicator2.length ) {
						x.next( '.sf-menu' ).find( '.sf-with-ul' ).each(function() {
							$( '.cz_indicator', this ).addClass( ( x.parent().parent().hasClass( 'sf-menu' ) ? indicator : indicator2 ) );
						});
					}

					$( '.sf-with-ul, .cz > h6', ul_offcanvas ).on( 'click', function(e) {
						if ( $( e.target ).hasClass( 'cz_indicator' ) ) {
							$( this ).next().slideToggle( 'fast' );
							e.preventDefault();
						}
					});

				}

			// OffCanvas
			}).on( 'click', '.offcanvas_container > i', function() {

				var x = $( this );

				if ( ! x.hasClass( 'done' ) ) {

					Codevz.offCanvas( x.addClass( 'done' ), 1 );

				}

			// Fullscreen Menu
			}).on( 'click', '.icon_fullscreen_menu', function( e ) {

				var x = $( '.fullscreen_menu' );

				body.addClass( 'cz_noStickySidebar' ).find( '.fixed_side_1.have_center' ).find( '.fullscreen_menu,.xtra-close-icon' ).appendTo( '.fixed_side_1.have_center' );

				x.fadeIn( 'fast' ).on( 'click', function() {
					$( this ).delay( 500 ).fadeOut( 'fast', function() {
						body.removeClass( 'cz_noStickySidebar' );
						$( '.xtra-close-icon' ).addClass( 'hide' );
					});
				});

				if ( x.is(':visible') ) {
					Codevz.showOneByOne( $( '> .cz', x ), 150 );
				}

				var h = x.find( '> li' ).height() * ( ( x.find( '> li' ).length - 1 ) / 2 );

				x.css( 'padding-top', ( ( wind.height() / 2 ) - h ) );

				$( '.xtra-close-icon' ).toggleClass( 'hide' ).off().on( 'click', function() {
					$( this ).addClass( 'hide' );
					x.fadeOut( 'fast' );
				});

			// Fullscreen
			}).on( 'hover', 'ul.fullscreen_menu .cz', function( e ) {

				e.stopPropagation();

			}).on( 'click', 'ul.fullscreen_menu .cz', function( e ) {

				if ( $( e.target ).hasClass( 'cz_indicator' ) ) {
					$( this ).closest( 'li' ).find( '> ul' ).fadeToggle( 'fast' );
					e.preventDefault();
					e.stopPropagation();
				}

			// Hidden fullwidth content
			}).on( 'click', '.hf_elm_icon', function( e ) {

				var x = $( this );

				x.next( '.hf_elm_area' ).slideToggle( 'fast' ).css({
					width: inla.outerWidth(),
					left: inla.offset().left,
					top: x.offset().top + x.outerHeight()
				});

				body.on( 'click.cz_hf_elm', function(e) {
					$( '.hf_elm_area' ).slideUp( 'fast' );
					body.off( 'click.cz_hf_elm' );
				});

				e.preventDefault();
				e.stopPropagation();

			});

			// Extra
			body.find( '.tagcloud' ).addClass( 'clr' );

			// Input buttons to button tag
			body.find( '.form-submit .submit, input.search-submit, .wpcf7-submit' ).codevz( 'button', function() {

				var x = $( this );

				$( '<button name="submit" type="submit" class="' + x.attr('class') + '">' + x.val() + '</button>' ).insertAfter( x );

				x.detach();

			});

			this.menu_anchor();
		},

		// Menu Anchor.
		menu_anchor: function( timeout ) {

			var aBar 	= body.hasClass( 'admin-bar' ) ? 32 : 0,
				mPage 	= body.find( '.sf-menu' ),
				mLink 	= body.find( "a[href*='#']" ).not( 'a[href*="#top"],.cz_no_anchor,.cz_no_anchor a, .vc_general, .cz_no_anchor a, .cz_lrpr a, .wc-tabs a, .cz_edit_popup_link, .page-numbers a, #cancel-comment-reply-link, .vc_carousel-control, [data-vc-container],.comment-form-rating a,.sm2-bar-ui a' ),
				sticky 	= body.find( '.header_is_sticky' ).not( '.smart_sticky, .header_4' ),
				scrollTop = 0,
				scrollToAnchor = function( target ) {

					clearTimeout( timeout );

					timeout = setTimeout( function() {

						target = target.replace( '%20', ' ' );
						target = ( target.indexOf( '#' ) >= 0 ) ? $( target ) : $( '#' + target );

						if ( target.length ) {

							scrollTop = $( document ).scrollTop();

							if ( wind.width() < 768 && body.find( '.header_4.header_is_sticky' ).length ) {
								sticky = body.find( '.header_4.header_is_sticky' ).not( '.smart_sticky' );
							}

							if ( scrollTop == 0 && sticky.length ) {
								$( document ).scrollTop( 1 );
							}

							setTimeout( function() {

								page.animate({ scrollTop: target.offset().top - aBar - ( sticky.outerHeight() || 0 ) }, 1200, 'easeCodevz', function() {

									page.stop();

								});

							}, scrollTop == 0 ? 450 : 1 );

						}

					}, 50 );

				};

			// Prevent page scroll jumping.
			var target = window.location.hash;
			if ( target ) {
				target = target.replace( '#', '' ).replace( '%20', ' ' );
				if ( $( '#' + target ).length ) {

					// Stop scroll.
					page.animate({scrollTop: 0}, 1);

					// Scroll to anchor.
					setTimeout(function() {
						scrollToAnchor( target );
					}, 1500 );
				}
			}

			// Links.
			if ( mLink.length ) {
				mLink.off( 'click.anchor' ).on( 'click.anchor', function(e) {

					if ( $( this.hash ).length && location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname ) {
						scrollToAnchor( this.hash );
					} else if ( this.hash ) {
						location = $( this ).attr( 'href' );
					}

					e.preventDefault();
				});

				var mPageH = mPage.outerHeight() + 15,
					mItems = mPage.find( "a[href*='#']" ),
					sItems = mItems.map(function(){
						var item = $( $( this ).attr( "href" ).replace( /\s+|%20/g, "" ).replace( /^.*\#(.*)$/g, "#$1" ) );
						if ( item.length ) {
							return item;
						}
					});

				wind.on( 'scroll', function() {

					clearTimeout( timeout );

					timeout = setTimeout( function() {

						var ft = $( this ).scrollTop() + mPageH + aBar + ( sticky.outerHeight() || 0 ),
							cur = sItems.map(function() {
								if ( $(this).offset().top < ft )
									return this;
								});

						cur = cur[cur.length-1];
						var id = cur && cur.length ? cur[0].id : "";
						if ( id && ! $( '#' + id + '.cz_popup_modal' ).length && $( '#' + id ).length ) {
							body.trigger( 'click' );
							mItems.parent().removeClass( "current_menu" ).end().filter( "[href*='#" + id + "']" ).parent().addClass( "current_menu" );
						} else {
							mItems.parent().removeClass( "current_menu" );
						}

					}, 50 );

				});
			}
		},

		// Height changed = run callback.
		heightChanged: function( elm, callback ) {
			var lastHeight = elm.outerHeight(), newHeight;

			// First.
			callback();

			// Height detect.
			( function run() {

				newHeight = elm.outerHeight();

				if ( lastHeight != newHeight ) {
					callback();
					lastHeight = newHeight;
				}

				if ( elm.onElementHeightChangeTimer ) {
					clearTimeout( elm.onElementHeightChangeTimer );
				}

				elm.onElementHeightChangeTimer = setTimeout( run, 100 );

			})();

		},

		/*
		*   offCanvas area
		*/
		offCanvas: function( selector, click, timeout ) {

			var parent  = selector.parent(),
				area    = selector.next(),
				layout  = body.find( '#layout' ),
				overlay = $( '.cz_overlay' ),
				isRight, i, 
				fixed_side = 0,
				close;

			if ( area.length ) {
				var area = area.clone(),
					isRight = area.hasClass( 'inview_right' ),
					new_class = area.hasClass('sf-menu') ? 'sf-menu offcanvas_area' : 'offcanvas_area offcanvas_original';

				body.prepend( area.removeClass().addClass( 'sidebar_offcanvas_area' ).addClass( new_class + ( isRight ? ' inview_right' : ' inview_left' ) ) );
				var area_w = area.width() + 80;

				area.find( '.sub-menu' ).hide();

			} else {
				return;
			}

			// Open icon
			selector.on( 'click', function(e) {

				if ( area.hasClass( 'active_offcanvas' ) && ! body.hasClass( 'offcanvas_doing' ) ) {

					page.removeClass( 'no-scroll' );
					
					overlay.trigger( 'click' );

				} else {

					page.addClass( 'no-scroll' );

					// Close icon
					area.before( '<i class="fa czico-198-cancel offcanvas-close"></i>' );
					close = area.prev( '.offcanvas-close' );
					close.on( 'click', function(e) {
						if ( click ) {
							body.removeClass( 'active_offcanvas' );
							area.removeClass( 'active_offcanvas' );
							
							overlay.fadeOut();
							setTimeout(function() {
								$( '.offcanvas-close' ).detach();
								wind.trigger( 'resize' );
								page.removeClass( 'no-scroll' );
							}, 500 );
							
							click = 0;
						} else {
							overlay.trigger( 'click' );
						}
					});
					close.css( ( isRight ? 'right' : 'left' ), area.outerWidth() + fixed_side );

					body.addClass( 'offcanvas_doing active_offcanvas' + ( isRight ? ' cz_offcanvas_right' : ' cz_offcanvas_left' ) );
					area.addClass( 'active_offcanvas' );

					if ( wind.width() > 768 ) {

						if ( ( $( '.fixed_side_left' ).length && $( '.cz_offcanvas_left' ).length ) || $( '.fixed_side_right' ).length  && $( '.cz_offcanvas_right' ).length ) {
							if ( ! $( '#cz_ofs' ).length ) {
								$( 'head' ).append( '<style id="cz_ofs"></style>' );
							}
							fixed_side = $( '.fixed_side' ).width();
							$( '#cz_ofs' ).html( '.active_offcanvas .offcanvas_area.active_offcanvas{transform:translateX(' + ( isRight ? '-' : '' ) + fixed_side + 'px)}' );
						}
						
					}

					overlay.fadeIn();

					setTimeout(function() {
						body.removeClass( 'offcanvas_doing' );
					}, 1250 );
				}

				e.stopPropagation();
			});

			// First time
			if ( click ) {
				selector.trigger( 'click' );
			}

			// Prevent close on open icon
			area.on( 'click', function(e) {
				e.stopPropagation();
			});

			// reCall anchors
			this.menu_anchor();

			// Click on body
			overlay.on( 'click', function( e ) {

				if ( $( '.active_offcanvas' ).length && ! body.hasClass( 'offcanvas_doing' ) ) {

					body.removeClass( 'active_offcanvas' );
					area.removeClass( 'active_offcanvas' );

					overlay.fadeOut();

					setTimeout(function() {

						$( '.offcanvas-close' ).detach();
						wind.trigger( 'resize' );
						page.removeClass( 'no-scroll' );

					}, 500 );

				}

				setTimeout(function() {

					if ( ! overlay.is( ':visible' ) && $( '.active_offcanvas' ).length ) {

						$( '.offcanvas-close' ).trigger( 'click' );

						page.removeClass( 'no-scroll' );

					}

				}, 500 );

			});

			// Close mobile on window resize.
			wind.on( 'resize', function( e ) {

				clearTimeout( timeout );

				timeout = setTimeout( function() {

					var mh4 = body.find( '#menu_header_4' );

					if( mh4.hasClass( 'active_offcanvas' ) && wind.width() > 768 ) {
						mh4.prev( 'i' ).trigger( 'click' );
					}

				}, 50 );

			});

			// Reload necessary scripts.
			if( ! area.hasClass( 'xtra-reload-js' ) ) {

				// Fix menu icon click issue specially on mobile.
				area.find( '.cz a' ).on( 'click', function( e ) {

					if ( $( e.target ).hasClass( 'cz_indicator' ) ) {

						var en = $( this );

						en.attr( 'data-href', en.attr( 'href' ) ).attr( 'href', '#' );

						setTimeout( function() {
							en.attr( 'href', en.attr( 'data-href' ) );
						}, 250 );

					}

				});

				// reInit codevz plus.
				Codevz_Plus.init();

				// Lazyload image inside offcanvas.
				setTimeout( function() {
					$( window ).trigger( 'scroll.lazyload' );
				}, 500 );

				// reInit contact form 7.
				if( typeof wpcf7 != 'undefined' && area.find( '.wpcf7' ).length ) {

					area.find( 'div.wpcf7 > form' ).each( function() {
						var $form = $( this );
						wpcf7.initForm( $form );

						if( wpcf7.cached ) {
							wpcf7.refill( $form );
						}
					} );

				}

				// reInit Facebook.
				setTimeout( function(){
					if ( window.FB ) {
						FB.XFBML.parse();
					}
				}, 2000 );

				area.addClass( 'xtra-reload-js' );

			}

		},

		/*
		*   Show one by one with delay
		*/
		showOneByOne: function( e, s, d ) {
			var e = ( d == 'left' ) ? $( e.get().reverse() ) : e,
				b = ( d == 'left' ) ? {opacity:0,left:10} : {opacity: 0,left:-10};

			e.css( b ).each(function( i ) {
				$( this ).delay( s * i ).animate({opacity:1,left:0});
			});
		},

	};

})( jQuery );

jQuery( function( $ ) {
	Codevz.init();
});