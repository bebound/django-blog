/*!
 * @author:		Angelo Dini
 * @copyright:	http://www.divio.ch under the BSD Licence
 */

// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function(){log.history = log.history || [];log.history.push(arguments);if(this.console) {arguments.callee = arguments.callee.caller;var newarr = [].slice.call(arguments);return (typeof console.log === 'object' ? log.apply.call(console.log, console, newarr) : console.log.apply(console, newarr));}};
// make it safe to use console.log always
// (function(b){function c(){}for(var d="assert,clear,count,debug,dir,dirxml,error,exception,firebug,group,groupCollapsed,groupEnd,info,log,memoryProfile,memoryProfileEnd,profile,profileEnd,table,time,timeEnd,timeStamp,trace,warn".split(","),a;a=d.pop();){b[a]=b[a]||c}})((function(){try{console.log();return window.console;}catch(err){return window.console={};}})());

// initialize global variables
window.Class = window.Class || {};
window.Cl = window.Cl || {};

// place any jQuery/helper plugins in here, instead of separate, slower script files.
(function(document){
	/*
	 * MBP - Mobile boilerplate helper functions
	 */
	window.MBP = window.MBP || {};

	// Fix for iPhone viewport scale bug
	// http://www.blog.highub.com/mobile-2/a-fix-for-iphone-viewport-scale-bug/
	MBP.viewportmeta = document.querySelector && document.querySelector('meta[name="viewport"]');
	MBP.ua = navigator.userAgent;
	MBP.scaleFix = function () {if (MBP.viewportmeta && /iPhone|iPad/.test(MBP.ua) && !/Opera Mini/.test(MBP.ua)) {MBP.viewportmeta.content = "width=device-width, minimum-scale=1.0, maximum-scale=1.0";document.addEventListener("gesturestart", MBP.gestureStart, false);}};
	MBP.gestureStart = function () { MBP.viewportmeta.content = "width=device-width, minimum-scale=0.25, maximum-scale=1.6"; };

	// Hide URL Bar for iOS and Android by Scott Jehl
	// https://gist.github.com/1183357
	MBP.hideUrlBar=function(){var a=window,b=a.document;if(!location.hash||!a.addEventListener){window.scrollTo(0,1);var c=1,d=setInterval(function(){if(b.body){clearInterval(d);c="scrollTop"in b.body?b.body.scrollTop:1;a.scrollTo(0,c===1?0:1)}},15);a.addEventListener("load",function(){setTimeout(function(){a.scrollTo(0,c===1?0:1)},0)},false)}}

	// Fast Buttons - read wiki below before using
	// https://github.com/shichuan/mobile-html5-boilerplate/wiki/JavaScript-Helper
	MBP.fastButton = function (element, handler) {this.element = element;this.handler = handler;if (element.addEventListener) {element.addEventListener('touchstart', this, false);element.addEventListener('click', this, false);}};MBP.fastButton.prototype.handleEvent = function(event) {switch (event.type) {case 'touchstart': this.onTouchStart(event); break;case 'touchmove': this.onTouchMove(event); break;case 'touchend': this.onClick(event); break;case 'click': this.onClick(event); break;}};MBP.fastButton.prototype.onTouchStart = function(event) {event.stopPropagation();this.element.addEventListener('touchend', this, false);document.body.addEventListener('touchmove', this, false);this.startX = event.touches[0].clientX;this.startY = event.touches[0].clientY;this.element.style.backgroundColor = "rgba(0,0,0,.7)";};MBP.fastButton.prototype.onTouchMove = function(event) {if(Math.abs(event.touches[0].clientX - this.startX) > 10 ||Math.abs(event.touches[0].clientY - this.startY) > 10    ) {this.reset();}};MBP.fastButton.prototype.onClick = function(event) {event.stopPropagation();this.reset();this.handler(event);if(event.type == 'touchend') {MBP.preventGhostClick(this.startX, this.startY);}this.element.style.backgroundColor = "";};MBP.fastButton.prototype.reset = function() {this.element.removeEventListener('touchend', this, false);document.body.removeEventListener('touchmove', this, false);this.element.style.backgroundColor = "";};MBP.preventGhostClick = function (x, y) {MBP.coords.push(x, y);window.setTimeout(function (){MBP.coords.splice(0, 2);}, 2500);};MBP.ghostClickHandler = function (event) {for(var i = 0, len = MBP.coords.length; i < len; i += 2) {var x = MBP.coords[i];var y = MBP.coords[i + 1];if(Math.abs(event.clientX - x) < 25 && Math.abs(event.clientY - y) < 25) {event.stopPropagation();event.preventDefault();}}};if (document.addEventListener) {document.addEventListener('click', MBP.ghostClickHandler, true);}MBP.coords = [];

	// iOS Startup Image
	// https://github.com/shichuan/mobile-html5-boilerplate/issues#issue/2
	MBP.splash = function () {var filename = navigator.platform === 'iPad' ? 'h/' : 'l/';document.write('<link rel="apple-touch-startup-image" href="/img/' + filename + 'splash.png" />' );};

	// Autogrow
	// http://googlecode.blogspot.com/2009/07/gmail-for-mobile-html5-series.html
	MBP.autogrow = function (element, lh) {function handler(e){var newHeight = this.scrollHeight,currentHeight = this.clientHeight;if (newHeight > currentHeight) {this.style.height = newHeight + 3 * textLineHeight + "px";}}var setLineHeight = (lh) ? lh : 12,textLineHeight = element.currentStyle ? element.currentStyle.lineHeight :getComputedStyle(element, null).lineHeight;textLineHeight = (textLineHeight.indexOf("px") == -1) ? setLineHeight :parseInt(textLineHeight, 10);element.style.overflow = "hidden";element.addEventListener ? element.addEventListener('keyup', handler, false) :element.attachEvent('onkeyup', handler);};
})(document);

// custom jquery plugins
jQuery(document).ready(function ($) {
	/*!
	 * Target modifier
	 * @version: 0.3.2
	 * @param: property (target:blank)
	 * @example: <a href="#" rel="target:blank">Lorem Ipsum</a>
	 */
	$.fn.defineTarget = function (options) {options = $.extend({ property: 'data-rel' }, options);return this.each(function () {if($(this).attr(options.property) === undefined) return false;$(this).attr('target', '_' + $(this).attr(options.property).split(':')[1]);});};

	/*!
	 * E-Mail encrypte
	 * @version: 0.3.2
	 * @param: autoConvert (converts innerhtml to match the email address)
	 * @example: <a href="#info" rel="divio.ch" class="mailcrypte">E-Mail</a>
	 */
	$.fn.mailCrypte = function (options) {options = $.extend({autoConvert: true}, options);return this.each(function () {var mailto = 'mailto:' + $(this).attr('href').replace('#', '') + '@' + $(this).attr('data-rel');$(this).attr('href', mailto);if(options.autoConvert) $(this).html(mailto.replace('mailto:', ''));});};

	/*!
	 * iFrame Generator
	 * @version: 0.0.2
	 */
	$.fn.iframe = function (options) {options = $.extend({ width: '100%', height: '100%', style: 'border:none; overflow:auto;'}, options);options.src = options.src || this.text();return this.each(function (e) {var iframe = '<iframe src="' + options.src + '" width="' + options.width + '" height="' + options.height + '" scrolling="no" frameborder="0" allowTransparency="true" style="' + options.style + '"></iframe>';$(this).html(iframe);});};

	/*!
	 * Pop-Up Generator
	 * @version: 0.2.2
	 * @param: width (initial width)
	 * @param: height (initial height)
	 * @example: <a href="http://www.google.ch" class="popup">Open Pop-Up</a>
	 */
	$.fn.autoPopUp = function (options) {options = $.extend({ width: 750, height: 500}, options);var size = { 'x': options.width, 'y': options.height };return this.each(function () {var url = $(this).attr('href');$(this).bind('click', function (e) {e.preventDefault();window.open(url, '_blank', 'width=' + size.x + ',height=' + size.y + ',status=yes,scrollbars=yes,resizable=yes');});});};

	/**
	 * Auto input fill-in
	 * @version: 0.6.1
	 * @param: label (if true than labeltext on parent else rel attribut on this)
	 * @param: strip (replacement text)
	 * @param: add (add additional information)
	 */
	$.fn.fieldLabel = function (options) {options = $.extend({label: true,strip: '',add: ''}, options);function show(el, label) {if(el.attr('value') != '') return false;el.attr('value', label);return true;}function hide(el, e, label) {if(e.type == 'blur' && el.attr('value') == label) return false;el.attr('value', '');return true;}return this.each(function () {var label = (options.label) ? $(this).parent().find('label').text() : $(this).attr('placeholder');label = label.replace(options.strip, '');label += options.add;if($(this).attr('value') == '') $(this).attr('value', label);$(this).bind('click', function (e) {if($(this).attr('value') == label) hide($(this), e, label)});$(this).bind('blur', function (e) {($(this).attr('value') == label) ? hide($(this), e, label) : show($(this), label);});})};

	// DLTrack
	$('a.dltrack').bind('click', function(e){
		if (!window._gaq){return;} // no ga loaded
		e.preventDefault();
		var link = $(this);
		var label = link.attr('dltrack-label') || link.text();
		_gaq.push(['_trackEvent', 'Download', label]);
		setTimeout(function(){
			window.location = link.attr('href');
		}, 100);
	});
});
