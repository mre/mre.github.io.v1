#!/usr/bin/env php

<?php
	// Posterous PHP export. Requires PHP 5.1.0 or newer
	// Documentation on http://posterous.com/api/reading

  // Set timezone for posterous blog
  date_default_timezone_set('America/Los_Angeles');

	// Query options
  $site_id = ""; 				        // Either use id of the site...
  $hostname = "matthiasendler"; // ...or a posterous subdomain.
	$num_posts = 10; 				          // Number of posts to read.
	$page = 1; 						                  // Get specific page.
  $tag = ""; 						         // Grab posts with these tags.
	
	// Create query string
	if ($site_id) 	$query = "site_id="  . $site_id;
	else 			      $query = "hostname=" . $hostname;
	
	if ($num_posts)	$query .= "&num_posts=" . $num_posts;
	if ($page)		  $query .= "&page=" 		  . $page;
	if ($tag) 		  $query .= "&tag=" 		  . $tag;
	
	// Request
	$url = "http://posterous.com/api/readposts?" . $query;
	$xml = simplexml_load_file($url);
	$post_count = count($xml->post);
	
	// Cumbersome way to walk post entries. 
	// See php.net/manual/de/function.simplexml-load-file.php#86471
	for($i = 0; $i < $post_count; $i++) { 
	  $post = $xml->post[$i]; 
	  // Now we can use $post->title, $post->date, $post->body...
	  write_markdown($post, "post");
	}
	
   /**
	  * Formats a posterous post as markdown to use it with jekyll
    * array $post The post that gets processed
    * string $layout The liquid template to use 
    */
	function write_markdown($post, $layout) {
		// Extract relevant data from $post
		$date  = date("Y-m-d", strtotime($post->date));
		
		// Create filename
		$extension = ".mkdn";
		$filename = $date . "-" . strtolower($post->title);
		
		// Remove whitespace and special characters from filename
		$patterns = array('/\s/', '/:/','/\(/','/\)/', '/]/', '/\[/', 
				'/!/', '/\?/', '/\+/', '/=/','/\./', '/\"/', '/,/');
		$filename = preg_replace($patterns, '-', $filename);
		
		// Replace multiple dashes with single dash
		$filename = preg_replace('/--+/', '-', $filename);
		
		// Remove possible dash at the end of filename
		$filename = trim($filename, '-');
		
		// We're good to go. Create a new markdown file
		$jekyll_post = fopen($filename . $extension, 'w');
		if ($jekyll_post) {
			// Jekyll requires a yaml front matter
			$yaml = "---\n" .
					"layout: " . $layout . "\n" .
					"title:  " . $post->title  . "\n" .
					"---\n";
					
			// Write front matter, post data and close file
			fwrite($jekyll_post, $yaml);
			fwrite($jekyll_post, $post->body);
			fclose($jekyll_post);
		}
	}
?>
