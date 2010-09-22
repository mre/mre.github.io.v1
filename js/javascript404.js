/* 
 * JavaScript 404 redirect
 * The idea is blatantly copied from 
 * http://www.alistapart.com/articles/perfect404
 * to fix my google search results.
 * (No mod-rewrite on github)
 */

if (strReferrer.length != 0) {
	// In the beginning there was Google...			
	if (strReferrer.indexOf("google") > 0) {
	
		// Search parameters
		var arrParams = strReferrer.split("?"); 
		var brokenUrl = arrParams[1];
		arrParams = strSearchTerms.split("&");
		var urlStr = "url="; // Googles URL parameter
		var post; // Requested post of my blog
		
		// Search for requested URL in query string
		for ( i = 0; i < arrParams.length; i++) {
			if (arrParams[i].indexOf(urlStr) == 0) {
				// We’ve found the requested URL!
				brokenUrl = arrParams[i];
				// Get requested post
				post = brokenUrl.substr(str.length-2);
			}
		}
		
		// Redirect to new post location if possible
		var site = "http://matthias-endler.de/";
		switch(post) {
			case "42": 
				window.location.replace(site + "2006/howto-switch-from-linux-to-windows/");
				break;
			default: 
				document.write ("<p>Redirect to post number " + post + " failed...<\/p>");
				break;
		}
	}
}