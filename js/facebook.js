  window.fbAsyncInit = function() {
	    FB.init({appId: '127569457295491', status: true, cookie: true,
             xfbml: true});
  };
  (function() {
    var e = document.createElement('script'); e.async = true;
    e.src = document.location.protocol +
      '//connect.facebook.net/en_US/all.js';
    document.getElementById('fb-root').appendChild(e);
  }());
  
document.write('<fb:like href="http://www.matthias-endler.de/' + location.pathname + '" layout="button_count" show_faces="false" width="160" action="like" font="lucida grande" colorscheme="light"></fb:like>');