// Returns a random integer between +-RANGE without values in +-GAP
function randRotation() {
	var RANGE = 10; // Number of values
	var GAP   = 6;  // Minimal rotation
	
	// Clean solution (but 66% slower in average)
	//	var rand = Math.floor(Math.random()*(RANGE-GAP/2)+GAP/2);
	//	var invert = Math.random();
	//	if (invert < 0.5) rand = -rand;
	//	return rand;

  // Quick and dirty solution
  var rand = 0;
  do {
      rand = Math.floor(Math.random()*(RANGE+1)-RANGE/2);
  } while (Math.abs(rand) < GAP/2);
  return rand;
}

// Grayscale w canvas method
function grayscale(src){
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  var imgObj = new Image();
  imgObj.src = src;
  canvas.width = imgObj.width;
  canvas.height = imgObj.height; 
  ctx.drawImage(imgObj, 0, 0); 
  var imgPixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
  for(var y = 0; y < imgPixels.height; y++){
    for(var x = 0; x < imgPixels.width; x++){
      var i = (y * 4) * imgPixels.width + x * 4;
      //var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
      var avg = (imgPixels.data[i] * 0.3 + imgPixels.data[i + 1] *0.59 + imgPixels.data[i + 2] *0.11);
      imgPixels.data[i] = avg; 
      imgPixels.data[i + 1] = avg; 
      imgPixels.data[i + 2] = avg;
    }
  }
  ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
  return canvas.toDataURL();
}

// On window load. This waits until images have loaded which is essential
$(window).load(function(){

  // Fade in images so there isn't a color "pop" document load and then on window load
  $("#content img").fadeIn(500);

  // clone image
  $('#content img').each(function(){
    var el = $(this);
    el.css({"position":"absolute"}).wrap("<div class='img_wrapper' style='display: inline-block'>").clone().addClass('img_grayscale').css({"position":"absolute","z-index":"998","opacity":"0"}).insertBefore(el).queue(function(){
      var el = $(this);
      el.parent().css({"width":this.width,"height":this.height});
      el.dequeue();
    });
    this.src = grayscale(this.src);
  });

  // Fade image 
  $('#content img').mouseover(function(){
    $(this).parent().find('img:first').stop().animate({opacity:1}, 300);
  });
  $('.img_grayscale').mouseout(function(){
    $(this).stop().animate({opacity:0}, 300);
  });		
});


$(document).ready(function() {	
			
	// Rotate menu items
	$(".box").each(function() {
		$(this).animate({rotate: randRotation()},{ duration:1000, easing: 'easeOutElastic'});
	});
	
    // Padding at bottom for menu buttons
    var inactive_in  = "23px";
    var inactive_out = "11px";
    var active_in    = "47px";
    var active_out   = "36px";

	 //Animate menu items
    $(".box").mouseover(function(){
        $(this).stop().animate({ 
            marginTop: "0px", 
            paddingBottom: inactive_in 
        },{
          queue:false, 
          duration:300, 
          easing: 'easeOutElastic'
        });
    });

    $(".box").mouseout(function(){
        $(this).stop().animate({
            marginTop: "12px", 
            paddingBottom: inactive_out 
        },{
          queue:false, 
          duration:300, 
          easing: 'easeOutElastic'
        });
    });
    
    $(".active").mouseover(function(){
        $(this).stop().animate({ marginTop: "0px", paddingBottom: active_in
        },{queue:false, 
          duration:300, 
          easing: 'easeOutElastic'
        });
    });
    $(".active").mouseout(function(){
      $(this).stop().animate({marginTop: "12px", paddingBottom: active_out },{queue:false, duration:300, easing: 'easeOutElastic'});
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
      $(this).stop(true, false).animate({paddingLeft:"0px", marginRight:"0px"}, {queue:true, duration:250});
		}
	);
});
