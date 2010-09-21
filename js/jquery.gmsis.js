/**
 * Give Me Stuff I Starred - gmsis
 *  by Bill Israel [http://cubicle17.com/]
 *
 * This plugin pulls the last X Instapaper articles you've starred.
 *
 * To use GMSIS, you'll need the URL for your Starred RSS feed, which
 * you can get from http://www.instapaper.com/starred if you're logged in.
 * NOTE: RSS feed URL _must_ start with "http://", not "feed://"
 *
 * Options:
 *  - count: (int) - the number of items to pull (5 by default, max is 25)
 *  - desc: (boolean) - whether to show item descriptions (false by default)
 *
 * Examples:
 *
 * To retrieve the 5 most recent starred articles:
 *  var url = "http://www.instapaper.com/rss/starred/2/asdfasdfasdf"
 *  $("#instapaper").gmsis(url);
 *
 * To retrieve the 2 most recent starred articles, and show descriptions:
 *  var url = "http://www.instapaper.com/rss/starred/2/asdfasdfasdf"
 *  $("#instapaper").gmsis(url, {count: 2, desc: true});
 *
 *
 * "Easter Egg":
 *  You can also use this script to pull your Unread list and your
 *  Archive list. To do this, just substitute the Unread or Archive RSS
 *  feed for the Starred feed. Everything else is the same.
 */
;(function($) {
$.fn.gmsis = function(url, options) {
    // If there's no URL to pull from, do nothing
    if(!url || url === '') return this;
    
    var opts = $.extend({}, $.fn.gmsis.defaults, options);
    return this.each(function() {
        var $this = $(this);
        
        // Load the RSS
        $.getJSON(url + "?jsonp=?", function(data) {
            var items = [];
            if (opts.desc) {
            	/* Full version for page */
	            var li_html = '<li> \
	                            <em>{base_url}:</em>\
	                            <a class="instapaper-link" href="{url}">{title}</a> \
	                            <div class="instapaper-desc sweet-justice">{desc} \
	                            <a class="instapaper-link greybg" title="Full article..." href="{url}">more...</a></div> \
	                           </li>';
	        } else {
	        	/* Smaller version for sidebar */
	        	var li_html = '<li> \
	        	                <a class="instapaper-link" href="{url}">{title}</a> \
	        	               </li>';
	        	
	       	}
	        
            
            $.each(data, function(index, item) {
                // Stop if we've gathered enough 
                if( index >= opts.count ) return false;
                
                var title = item.title, link = item.url;
                
                // Extract base url from link
                var url_link = $('<a />');
                url_link.attr('href', link);
                var base_link = url_link.attr('hostname');
                
                // Strip unwanted text
                base_link = base_link.replace("www." , "");
                
                var desc = opts.desc && item.selection ? item.selection : '';
                li = li_html.replaceAll("{base_url}", base_link)
                			.replaceAll("{title}", title)
                            .replaceAll("{url}", link)
                            .replaceAll("{desc}", desc);
                
                items.push(li);
            });
            
            // Make UL from gathered items
            $("<ul>" + items.join('') + "</ul>").appendTo($this);
        });
    });
};

$.fn.gmsis.defaults = { count: 5, desc: false };
})(jQuery);
