! function( $ ) {
	"use strict";

	Codevz_Plus.counter = function() {

		$( document.body ).find( '.cz_counter' ).codevz( 'counter', function( x, i ) {

			var del = $( window ).width() <= 480 ? 0 : parseInt( x.data( 'delay' ) ) || 0, 
				eln = x.find( '.cz_counter_num' ),
				org = eln.text(),
				per = Math.ceil( org ).toLocaleString() == 'NaN' ? true : false,
				num = parseInt( Codevz_Plus.convertNumbers( org ) ),
				dur = parseInt( x.data( 'duration' ) ),
				com = !x.data( 'disable-comma' ),
				tls = com ? Math.ceil( num ).toLocaleString() : Math.ceil( num );

			// If duration is 0
			if ( dur == 0 || $( window ).width() <= 768 ) {

				eln.html( per ? Codevz_Plus.convertNumbers( tls, true ) : tls );
				
				return;

			}

			// If once done
			if ( x.hasClass( 'done' ) ) {
				if ( num == '0' ) {
					x.removeClass( 'done' );
				} else {
					return;
				}
			}

			eln.html( per ? Codevz_Plus.convertNumbers( '0', true ) : '0' );

			// On page scrolling
			$( window ).on( 'scroll.counter', function() {

				if ( Codevz_Plus.inview( x ) && ! x.hasClass( 'done' ) ) {

					x.addClass( 'done' ).delay( del ).prop( 'Counter', 0 ).animate(
						{
							Counter: num
						},
						{
							duration: dur,
							easing: 'swing',
							step: function () {
								num = com ? Math.ceil( this.Counter ).toLocaleString() : Math.ceil( this.Counter );
								eln.text( per ? Codevz_Plus.convertNumbers( num, true ) : num );
							},
							complete: function() {
								eln.text( per ? Codevz_Plus.convertNumbers( tls, true ) : tls );
							}
						}
					);
				}

				if ( ! $( '.cz_counter:not(.done)' ).length ) {
					$( window ).off( 'scroll.counter' );
				}

			}).trigger( 'scroll.counter' );

		});

	};

	Codevz_Plus.counter();

}( jQuery );