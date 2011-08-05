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
