/*!
 * @author:		Angelo Dini
 * @copyright:	http://www.divio.ch under the BSD Licence
 * @requires:	jQuery
 */

//##################################################
// #BASE.JS#
jQuery(document).ready(function($) {
	// Base initial class
	Cl.Base = {
		init: function () {
			// remove no-js class if javascript is activated
			$(document.body).removeClass('no-js');
			// load mobile specific informations
			this.mobile();
			// print functions
			this.print();
			// custom fixes for general internet explorer
//			if($.browser.msie) this.ie();
			// mobile navigation
			this.mobilenav();
		},

		mobilenav: function () {
			$('#mobilenav').bind('change', function() {
				window.location = $(this).val();
			});
		},

		mobile: function () {
			if(Cl.Utils.mobile() && MBP) {
				MBP.hideUrlBar();
				MBP.scaleFix();
			}
	        // viewport zoom fix
			if(!$.browser.msie) {
				// fixes scale issue
				var viewportmeta = document.querySelector('meta[name="viewport"]');
				if(viewportmeta) {
					viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1.0';
					// reset to normal behaviour as soon as gestures are started
					document.body.addEventListener('gesturestart', function () {
						viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6';
					}, false);
				}
			}
			// enabling mobile navigation
			//$('#mainnav-mobile').find('select').bind('change', function () {
			//	window.location.href = $(this).val();
			//});
		},

		print: function () {
			$('.jsprint').bind('click', function (e) {
				e.preventDefault();
				window.print();
			});
		},

		ie: function () {
			// attach label functions cause ie doesnt support the placeholder element
//			$('#field_quicksearch').fieldLabel({ label: false });
//			$('#field_newsletter').fieldLabel({ label: false });
		}
	};

	// Utils
	Cl.Utils = {
		mobile: function () {
			return (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/Android/i));
		},

		tablet: function () {
			return (navigator.userAgent.match(/iPad/i));
		}
	};

	// autoinit base class, this has to be at the end
	Cl.Base.init();

});

(function ($) {
    /* lets have fun */
    $.fn.konami = function( fn, params ) {
        params = $.extend({}, $.fn.konami.params, params);
        this.each(function(){
            var tgt         = $(this);
            tgt.bind( 'konami', fn )
                .bind( 'keyup', function(event) { $.fn.konami.checkCode( event, params, tgt ); } );
        });
        return this;
    };

    $.fn.konami.params = {
        'code': [38, 38, 40, 40, 37, 39, 37, 39, 66, 65],
        'step': 0
    };

    $.fn.konami.checkCode = function( event, params, tgt ) {
        if(event.keyCode == params.code[params.step]) {
            params.step++;
        } else {
            params.step     = 0;
        }

        if(params.step == params.code.length) {
            tgt.trigger('konami');
            params.step     = 0;
        }
    };

    $(window).konami(function(){
        if($('.django-pony')) $('.django-pony').fadeOut();

        var el = '<div class="flyingpony"><img alt="Django Pony" src="/static/img/django-pony.png"></div>';
        $(el).appendTo(document.body);

        $('.flyingpony').animate({
            left: ($(window).width()/1)+395,
            top: '1000px'
        }, 3000);

        $(document.body).css('overflow', 'hidden');

        // fadeout pony
        setTimeout(function () {
            $('.flyingpony').hide();
        }, 3000);

        // finish
        setTimeout(function () {
            $(document.body).css('overflow', 'auto');
            if($('.django-pony')) $('.django-pony').fadeIn();
        }, 3000);

    });
})(jQuery);