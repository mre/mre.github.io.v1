// Returns a random integer between +-RANGE without values in +-GAP
function randRotation() {
	var RANGE = 20; // Number of values
	var GAP   = 6;  // Minimal rotation
	
	// Clean solution (but 66% slower in average)
	//	var rand = Math.floor(Math.random()*(RANGE-GAP/2)+GAP/2);
	//	var invert = Math.random();
	//	if (invert < 0.5) rand = -rand;
	//	return rand;

	// Quick and dirty solution
	do {
		var rand = Math.floor(Math.random()*(RANGE+1)-RANGE/2);
	} while (Math.abs(rand) < GAP/2);
	return rand;
};

$(document).ready(function() {	
			
	// Rotate menu items
	$(".box").each(function() {
		$(this).animate({rotate: randRotation()},{ duration:1000, easing: 'easeOutElastic'});
	});
	
	 //Animate menu items
    $(".box").mouseover(function(){
        $(this).stop().animate({ marginTop: "0px", paddingBottom: "23px"
        },{queue:false, duration:300, easing: 'easeOutElastic'})
    });
    $(".box").mouseout(function(){
        $(this).stop().animate({marginTop: "12px", paddingBottom: "11px"},{queue:false, duration:300, easing: 'easeOutElastic'})
    });
    
    $(".active").mouseover(function(){
        $(this).stop().animate({ marginTop: "0px", paddingBottom: "47px"
        },{queue:false, duration:300, easing: 'easeOutElastic'})
    });
    $(".active").mouseout(function(){
        $(this).stop().animate({marginTop: "12px", paddingBottom: "36px"},{queue:false, duration:300, easing: 'easeOutElastic'})
    });
	
	// Show a nice fortune cookie
	$("#cookie").fortune({file: "/cookies.txt", animate: true});
	
	// Show relative time (e.g. "two years ago")
	jQuery("abbr.timeago").timeago();
	
	// Remove info-boxes on click.
	$('.intro').click(function() {
	  $('.intro').hide();
	});
	
	// Sidebar link effect
	$('#elsewhere li').removeClass("hoverpad"); // Prevent css padding on hover
	
	// Animate padding on hover 
	$('#elsewhere li').hover(
		function(){
			$(this).stop(true, false).animate({paddingLeft:"15px", marginRight:"0px"}, { queue:false, duration:250});
		},
		function(){
			$(this).stop(true, false).animate({paddingLeft:"0px", marginRight:"0px"}, {queue:true, duration:250})
		}
	);
	
	// Header rainbow effect
	$("#matthias").rainbow();	
});


/* Third-party plugins below */

// rainbow text by Michael Monteleone (http://michaelmonteleone.net/)
(function($){
    $.fn.rainbow = function(options) {
        var settings = $.extend({}, $.fn.rainbow.defaults, options || {});
        
        if(this.length === 0) {
            return this;
        }
        
        var text = this.html();
        this.empty();
        for(var i=0;i<text.length;i++) { 
            var letter = $('<span>'+text.charAt(i)+'</span>').data('to-color',settings.colors[i % settings.colors.length]);
            this.append(letter);
        }
        var animationSettings = {duration: settings.duration, queue: false};
        $(this.selector + ' span')
            .bind('mouseover', function(e){
                var span = $(e.target);
                span.animate({color: span.data('to-color')}, {duration: settings.colorDuration, queue: false});
            })
            .bind('mouseout', function(e){
                $(e.target).animate({color: settings.defaultColor}, {duration: settings.unColorDuration, queue: false});
            });
        return this;
    };
    $.extend($.fn.rainbow, {
        defaults: {
            defaultColor: '#70f217',
            colorDuration: 100,
            unColorDuration: 500,
            // lime green, orange, pink, blue, red, yellow, cyan
            colors: ['#AAFF00','#FFAA00','#FF00AA', '#00AAFF', '#DF151A', '#F4F328', '#00CBE7', '#BBBB88' ]
        }        
    });
})(jQuery);

/*
 * jQuery Color Animations
 * Copyright 2007 John Resig
 * Released under the MIT and GPL licenses.
 */

(function(jQuery){

    // We override the animation for all of these color styles
    jQuery.each(['backgroundColor', 'borderBottomColor', 'borderLeftColor', 'borderRightColor', 'borderTopColor', 'color', 'outlineColor'], function(i,attr){
        jQuery.fx.step[attr] = function(fx){
            if ( fx.state === 0 ) {
                fx.start = getColor( fx.elem, attr );
                fx.end = getRGB( fx.end );
            }

            fx.elem.style[attr] = "rgb(" + [
                Math.max(Math.min( parseInt((fx.pos * (fx.end[0] - fx.start[0])) + fx.start[0], 10), 255), 0),
                Math.max(Math.min( parseInt((fx.pos * (fx.end[1] - fx.start[1])) + fx.start[1], 10), 255), 0),
                Math.max(Math.min( parseInt((fx.pos * (fx.end[2] - fx.start[2])) + fx.start[2], 10), 255), 0)
            ].join(",") + ")";
        };
    });

    // Color Conversion functions from highlightFade
    // By Blair Mitchelmore
    // http://jquery.offput.ca/highlightFade/

    // Parse strings looking for color tuples [255,255,255]
    function getRGB(color) {
        var result;

        // Check if we're already dealing with an array of colors
        if ( color && color.constructor === Array && color.length === 3 ) {
            return color;
        }

        // Look for rgb(num,num,num)
        if (result = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color)) {
            return [parseInt(result[1], 10), parseInt(result[2], 10), parseInt(result[3], 10)];
        }

        // Look for rgb(num%,num%,num%)
        if (result = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(color)) {
            return [parseFloat(result[1])*2.55, parseFloat(result[2])*2.55, parseFloat(result[3])*2.55];
        }

        // Look for #a0b1c2
        if (result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(color)) {
            return [parseInt(result[1],16), parseInt(result[2],16), parseInt(result[3],16)];
        }

        // Look for #fff
        if (result = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(color)) {
            return [parseInt(result[1]+result[1],16), parseInt(result[2]+result[2],16), parseInt(result[3]+result[3],16)];
        }

        // Otherwise, we're most likely dealing with a named color
        return colors[jQuery.trim(color).toLowerCase()];
    }
    
    function getColor(elem, attr) {
        var color;

        do {
            color = jQuery.curCSS(elem, attr);

            // Keep going until we find an element that has color, or we hit the body
            if ( color != '' && color != 'transparent' || jQuery.nodeName(elem, "body") ) {
                break;              
            }

            attr = "backgroundColor";
        } while ( elem = elem.parentNode );

        return getRGB(color);
    }
    
    // Some named colors to work with
    // From Interface by Stefan Petre
    // http://interface.eyecon.ro/

    var colors = {

    };
    
})(jQuery);