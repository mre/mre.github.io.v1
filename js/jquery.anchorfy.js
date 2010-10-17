/**
 * jQuery anchorfy
 * --------------------------------------------------------------------------
 *
 * jQuery anchorfy creates a list of anchors for elements
 * 
 * Dual licensed under the MIT and GPL licenses:
 *	http://www.opensource.org/licenses/mit-license.php
 *	http://www.gnu.org/licenses/gpl.html
 * 
 * @version     0.1
 * @since       14.10.2010
 * @author      Matthias Endler
 * @link        http://matthias-endler.de
 * @twitter     http://twitter.com/matthiasendler
 * @license     http://www.opensource.org/licenses/mit-license.php MIT 
 * @license		http://www.gnu.org/licenses/gpl.html GPL
 * @package     jQuery Plugins
 * 
 */

(function($) {

	// Define rating object with some default config settings
	$.anchorfy = {
		defaults: {
			animate:		false, // Bar gets expanded on page load
			duration:		1500, // Animation time
			ease:			"swing", // Animation easing effect
			anchorsElement:	'.anchors',
			anchorsPrefix:	'heading',
			anchorsSuffix:	'',
			wrapperClass:	'anchorfy_wrapper',
			innerClass:		'anchorfy_inner',
			wrapperMarkup:	'',
			innerMarkup:	'',
			anchorMarkup:	''
		}
	};
	
	// Extend jquery with the plugin
	$.fn.extend({
		anchorfy:function(config) {
			// Use defaults or properties supplied by user
			var config = $.extend({}, $.anchorfy.defaults, config);
			config.contentElement = this;
			if (!config.wrapperMarkup) {
				 config.wrapperMarkup = "<ul class='" + config.wrapperClass + "' />";
			}
			if (!config.innerMarkup) {
				 config.innerMarkup = "<li class='" + config.innerClass + "' />";
			}
			if (!config.anchorMarkup) {
				 config.anchorMarkup = "<a/>";
			}
			
			// Call function to create rating bar
			anchorfy(config);
			
			// Create a nice scroll animation if demanded
			if (config.animate) {
				$('a[href*=#]').bind("click", function(e) {
				   //prevent the "normal" behaviour which would be a "hard" jump
				   e.preventDefault();
				   //Get the target
				   var target = $(this).attr("href").replace('#','');
				   
				   //perform animated scrolling
				   
				   $('html,body').stop().animate({
				       //get top-position of target-element and set it as scroll target
				       scrollTop: $("a[name="+target+"]").offset().top
				   //scrolldelay: 2 seconds
				   },config.duration, config.ease ,function(){
				           //attach the hash (#jumptarget) to the pageurl
				           location.hash = target;
				   });
				}
				);
				return false;
			}
			
			// Return the jquery object for chaining
			return this;
		}
	});
	
  	// Create anchors
	function anchorfy(config) {
		
		// Create empty anchors list
		var list = $(config.wrapperMarkup).appendTo(config.anchorsElement)
	
		// Search content element for headers
		$(':header', config.contentElement).each(function(index) {
		
			// Construct anchor name
			var anchorname = config.anchorsPrefix + index + config.anchorsSuffix;

			// Create anchor
			var anchor = $(config.anchorMarkup).attr("name", anchorname);
			
			// Create link to anchor
			var anchorlink = $(config.anchorMarkup).attr("href", "#" + anchorname);
			
			// Place new elements on the page (DOM)
			$(this).wrapInner(anchor);
			var item = config.innerMarkup;
			var headline = $(this).text();
			list.append($(item).text(headline).wrapInner(anchorlink));	
		});	
	};	
})(jQuery);