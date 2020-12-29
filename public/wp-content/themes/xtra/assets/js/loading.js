jQuery( function( $ ) {

	var p = $( '.pageloader' );

	if ( p.length ) {

		var pp 		= p.find( '.pageloader_percentage' ),
			p_done 	= function() {

				if ( ! $( '.pageloader_click' ).length ) {

					p.addClass( 'pageloader_done' );
					setTimeout(function() {
						p.addClass( 'pageloader_done_all' );
					}, 1200 );

				}

			};

		// Percentage type.
		if ( pp.length ) {
			var images = $( '.inner_layout img' ),
				imgCount = images.length,
				process_done = 0, done, num;

			images.imagesLoaded().progress(function( imgLoad, image ) {
				if ( imgLoad.progressedCount === imgCount && process_done ) {
					setTimeout(function() {
						pp.html( '100%' );
						p_done();
					}, 1000 );
				} else {
					num = ( ( imgLoad.progressedCount / imgCount ) * 100 ).toFixed();

					setTimeout(function() {
						pp.html( num + '%' );
					}, num * 15 );

					if ( ( imgLoad.progressedCount + 1 ) == imgCount ) {
						process_done = 1;
					}
				}
			});

		} else {

			$( window ).on( 'load.p_done', function() {
				p_done();
			});

		}

		// Custom time
		setTimeout( function(){
			p_done();
		}, 4000 );

		// Loading on click
		if ( ! pp.length ) {

			$( 'a[href*="//"]' ).not( 'a[href*="#"],a[href*="?"],.cz_lightbox,.cz_a_lightbox a,a[href*="youtube.com/watch?"],a[href*="youtu.be/watch?"],a[href*="vimeo.com/"],a[href*=".jpg"],.product a,.esgbox,.jg-entry,.prettyphoto,.cz_grid_title,.ngg-fancybox,.fancybox,.lightbox,a[href*=".jpeg"],a[href*=".png"],a[href*=".gif"],.cz_language_switcher,.add_to_cart_button,.cart_list .remove,a[target="_blank"],[href^="#"],[href*="wp-login"],[id^="wpadminb"] a,[href*="wp-admin"],[data-rel^="prettyPhoto"],a[href$=".jpg"],a[href$=".jpeg"],a[href$=".png"],a[href$=".gif"],a[href$=".mp3"],a[href$=".zip"],a[href$=".rar"],a[href$=".mov"],a[href$=".mp4"],a[href$=".pdf"],a[href$=".mpeg"],.comment-reply-link' ).on( 'click', function(e) {

				if ( ! $( this ).hasClass( 'sf-with-ul' ) && $( e.target ).prop( 'tagName' ) != 'I' ) {

					p.addClass( 'pageloader_click' ).removeClass( 'pageloader_done pageloader_done_all' );

				}

			});

		}
	}

});