! function( $ ) {
	"use strict";

	Codevz_Plus.popup = function() {

		var body = $( document.body );

		body.find( '.cz_popup_modal' ).codevz( 'popup_clone', function() {

			var en 		= $( this ),
				outer 	= en.parent();

			// Move popup to footer
			if ( outer.length && ! en.closest( '.vc_cz_popup' ).length ) {
				$( outer[0].outerHTML ).appendTo( 'body' );
				outer.remove();
			}

		});

		// Reset wpb bar
		if ( body.hasClass( 'compose-mode' ) ) {
			$( '.cz_edit_popup_link', parent.document.body ).remove();
		}

		// Close popup
		body.on( 'click', ".cz_close_popup, #cz_close_popup, .cz_overlay, a[href*='#cz_close_popup']", function( e ) {

			body.find( '.vc_cz_popup, .vc_cz_popup, .cz_popup_modal' ).hide().removeClass( 'cz_show_popup' );

			e.preventDefault();
			e.stopPropagation();
			e.stopImmediatePropagation();

			return false;

		});

		// Each popup.
		body.find( '.cz_popup_modal' ).codevz( 'popup_modal', function() {

			var dis = $( this ),
				idd = dis.attr( 'id' ),
				ovl = dis.data( 'overlay-bg' ),
				dly = dis.data( 'settimeout' ),
				scr = dis.data( 'after-scroll' ),
				par = $( '#' + idd ).closest( '.vc_cz_popup' ),
				show_popup = function() {

					par.fadeIn( 'fast' );
					$( '.vc_cz_popup, #' + idd ).fadeIn( 'fast' ).delay( 1000 ).addClass( 'cz_show_popup' );
					dis.find( '.cz_overlay' ).css( 'background', ovl );

					if ( dis.find( '.slick' ).length && typeof Codevz_Plus.slick != 'undefined' ) {
						Codevz_Plus.slick();
					}

				};

			// Fix CF7 Pro inside Popup
			if ( ! par.length && typeof wpcf7 != 'undefined' && dis.find( '.wpcf7' ).length ) {

				dis.find( 'div.wpcf7 > form' ).each( function() {
					var $form = $( this );
					wpcf7.initForm( $form );

					if ( wpcf7.cached ) {
						wpcf7.refill( $form );
					}
				} );

			}

			// Update lightbox.
			Codevz_Plus.lightGallery( $( '#' + idd ) );

			// Open popup
			$( "a[href*='#" + idd + "']" ).on( 'click', function( e ) {

				show_popup();

				e.preventDefault();

			});

			// Fix multiple same popup
			dis.attr( 'data-popup', idd );

			// Start
			if ( $( '#' + idd ).length ) {

				// WPBakery frontend
				if ( par.length ) {

					// Add popup link to wpb bar
					$( '#' + idd ).each(function() {

						var vc_nav = $( '.vc_navbar-nav', parent.document.body );

						if ( ! vc_nav.find( '.edit_' + idd ).length ) {
							vc_nav.append( '<li class="vc_pull-right cz_edit_popup_link"><a class="vc_icon-btn vc_post-settings edit_' + idd + '" data-id="' + idd + '" href="#' + idd + '" title="Popup: ' + idd + '"><i class="vc-composer-icon far fa-window-restore" style="font-family: \'Font Awesome 5 Free\' !important;font-weight:400"></i></li>' );
						}

					});

					// Set popup styling
					par.attr( 'style', $( '#' + idd ).attr( 'style' ) );				

					// Open popup
					$( '.edit_' + idd, parent.document.body ).off().on( 'click', function(e) {
						show_popup();
						e.preventDefault();
					});

					// Delete popup
					$( "#" + idd + " .cz_close_popup, #cz_close_popup, .cz_overlay, a[href*='#cz_close_popup']" ).off();
					$( '.vc_control-btn-delete', par ).on('click', function() {
						$( '.edit_' + idd, parent.document.body ).closest( 'li' ).remove();
					});
				}

				// Close popup, Check session for future visits
				$( ".cz_close_popup, #cz_close_popup, .cz_overlay, a[href*='#cz_close_popup']" ).on( 'click', function( e ) {

					if ( dis.hasClass( 'cz_popup_show_once' ) ) {
						localStorage.setItem( idd, 1 );
					}

				});

				// If popup is always show, then remove session
				if ( dis.hasClass( 'cz_popup_show_always' ) && localStorage.getItem( idd ) ) {
					localStorage.removeItem( idd );
				}

				// Check visibility mode on page load
				if ( dis.hasClass( 'cz_popup_page_start' ) && ! localStorage.getItem( idd ) ) {
					show_popup();
				} else if ( dis.hasClass( 'cz_popup_page_loaded' ) && ! localStorage.getItem( idd ) ) {
					$( window ).on( 'load', function() {
						show_popup();
					});
				}

				// Auto open after delay.
				if ( dly ) {
					setTimeout(function() {
						show_popup();
					}, dly );
				}

				// Auto open after specific scroll position.
				if ( scr ) {

					$( window ).on( 'scroll.popup_scroll', function() {

						var scrollPercent = 100 * $( window ).scrollTop() / ( $(document).height() - $( window ).height() );

						if ( scrollPercent >= scr ) {

							show_popup();

							$( window ).off( 'scroll.popup_scroll' );

						}

					});

				}

			} else {

				console.log( 'Popup not found, id: #' + idd );

			}

		});

	};

	Codevz_Plus.popup();

}( jQuery );