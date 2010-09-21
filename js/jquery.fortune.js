/*

jQuery.fortune

Version: 0.8
Author: Mohammed Badran (http://disentangled.net)
Manual: http://mbadran.github.com/jquery.fortune/

*/

(function($) {

    $.fn.fortune = function(options) {
        var element = this;
        var settings = {
            file: "cookies.txt",
            delimiter: "%",
            animate: false
        };

        if (options) $.fn.extend(settings, options);

        if (settings.file.match(/\.txt$/)) {
            $.get(settings.file, function(data) {
                var cookies = data.split(settings.delimiter);
                var randomNum = Math.floor(Math.random() * cookies.length);

                $(element).html(cookies[randomNum]);
            });
        }
        else if (settings.file.match(/\.json$/)) {
            $.getJSON(settings.file, function(data) {
                var cookies = data[settings.cookieNode];
                var randomNum = Math.floor(Math.random() * cookies.length);

                // complex cookie element, with children/metadata
                if (settings.metaNodes) {
                    // populate the HTML elements with the corresponding attributes
                    $(element).find(".index").html(cookies[randomNum][settings.metaNodes.theIndex]);
                    $(element).find(".content").html(cookies[randomNum][settings.metaNodes.theContent]);
                    $(element).find(".source").html(cookies[randomNum][settings.metaNodes.theSource]);
                    $(element).find(".date").html(cookies[randomNum][settings.metaNodes.theDate]);
                }
                // simple cookie element, no children/metadata
                else {
                    $(element).html(cookies[randomNum]);
                }
            });
        }
        else if (settings.file.match(/\.xml$/)) {
            $.get(settings.file, function(data) {
                var randomNum = Math.floor(Math.random() * $(settings.cookieNode, data).size());
                var randomCookie = $(settings.cookieNode, data).get(randomNum);

                // complex cookie element, with children/metadata
                if (settings.metaNodes) {
                    // populate the HTML elements with the corresponding attributes
                    element.each(function() {
                        $(element).find(".index").html($(randomCookie).find(settings.metaNodes.theIndex).text());
                        $(element).find(".content").html($(randomCookie).find(settings.metaNodes.theContent).text());
                        $(element).find(".source").html($(randomCookie).find(settings.metaNodes.theSource).text());
                        $(element).find(".date").html($(randomCookie).find(settings.metaNodes.theDate).text());
                    });
                }
                // single cookie element, no children/metadata
                else {
                    $(element).html($(randomCookie).text());
                }
            });
        }
        else return false;

        if (settings.animate == true) element.hide().fadeIn("slow");

        return false;
    };
 
})(jQuery);
