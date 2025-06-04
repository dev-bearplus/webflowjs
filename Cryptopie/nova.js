// ------------------------------
// Sniffing is gross, sorry. 
//

//! Detect reduced motion
var fullMotion = false;
if (window.matchMedia &&
	window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
		document.body.classList.remove('reduce-motion');
		fullMotion = true;
	}
	
//! Detect dark mode
var darkmode = null;
if (window.matchMedia &&
	window.matchMedia('(prefers-color-scheme: dark)').matches) {
		document.body.dataset.mode = 'dark';
		darkmode = true;
		lightmode = null;
	}
	
//! Detect light mode
var lightmode = null;
if (window.matchMedia &&
	window.matchMedia('(prefers-color-scheme: light)').matches) {
		document.body.dataset.mode = 'light';
		lightmode = true;
		darkmode = null;
	}
	
//! Detect touch devices
var touchscreen = null;
window.addEventListener('touchstart', function didTouch() {
	// This appears to be a touchscreen device.
	document.body.classList.add('touch');
	window.removeEventListener('touchstart', didTouch, false);
	touchscreen = true;
}, false);

//! Detect mobile devices
var mobile = null;
if (/Mobi/.test(navigator.userAgent)) {
	document.body.classList.add('mobile');
	mobile = true;
}

//! Detect Front Page/Canvas Element
var frontpage = null;
if (document.querySelector("canvas#starfield")) {
	frontpage = true;
}

if (frontpage) {
	//! Detect WebGL (from http://www.studyjs.com/webgl/webglcontext.html)
	var webgl = null;
	var canvas = document.createElement('canvas');
	var webglContextParams = ['webgl', 'experimental-webgl', 'webkit-3d', 'moz-webgl'];
	var webglContext = null;
	for (var index = 0; index < webglContextParams.length; index++) {
		try {
			webglContext = canvas.getContext(webglContextParams[index]);
			if (webglContext) {
				//breaking as we got our context
				webgl = true;
				break;
			}
		} catch (E) {
			console.log(E);
		}
	}
	
	//! Toggle Interface Animation
	var theInterface = document.querySelector('#the_interface');

	if ("IntersectionObserver" in window) {		
		var interfaceObserver = new IntersectionObserver(function(entry, observer) {
			if (entry[0].isIntersecting) {
				theInterface.classList.add("running");
			}
			else {
				theInterface.classList.remove("running");
			}
		});	
			
		interfaceObserver.observe(theInterface);
	}
	else {
		var toggleInterfaceThrottleTimeout;
		function toggleInterface(){
			if(toggleInterfaceThrottleTimeout) {
				clearTimeout(toggleInterfaceThrottleTimeout);
			}	
			
			toggleInterfaceThrottleTimeout = setTimeout(function() {
				var scrollTop = window.pageYOffset;
				if (theInterface.offsetTop < (window.innerHeight + scrollTop) && (theInterface.offsetTop + window.innerHeight) > scrollTop) {
						theInterface.classList.add("running");
					}
				else {
					theInterface.classList.remove("running");
				}
			}, 20);
		}

		document.addEventListener("scroll", toggleInterface);
		window.addEventListener("resize", toggleInterface);
		window.addEventListener("orientationChange", toggleInterface);
	}
	
	//! Toggle Settings Animation
// 	var theSettings = document.querySelector('#the_settings');
// 
// 	if ("IntersectionObserver" in window) {		
// 		var interfaceObserver = new IntersectionObserver(function(entry, observer) {
// 			if (entry[0].isIntersecting) {
// 				theSettings.classList.add("running");
// 			}
// 			else {
// 				theSettings.classList.remove("running");
// 			}
// 		});	
// 			
// 		interfaceObserver.observe(theSettings);
// 	}
// 	else {
// 		var toggleSettingsThrottleTimeout;
// 		function toggleSettings(){
// 			if(toggleSettingsThrottleTimeout) {
// 				clearTimeout(toggleSettingsThrottleTimeout);
// 			}	
// 			
// 			toggleSettingsThrottleTimeout = setTimeout(function() {
// 				var scrollTop = window.pageYOffset;
// 				if (theSettings.offsetTop < (window.innerHeight + scrollTop) && (theSettings.offsetTop + window.innerHeight) > scrollTop) {
// 						theSettings.classList.add("running");
// 					}
// 				else {
// 					theSettings.classList.remove("running");
// 				}
// 			}, 20);
// 		}
// 
// 		document.addEventListener("scroll", toggleSettings);
// 		window.addEventListener("resize", toggleSettings);
// 		window.addEventListener("orientationChange", toggleSettings);
// 	}

	//! Lazy Load Images
	// adapted from https://css-tricks.com/the-complete-guide-to-lazy-loading-images/
	
	document.addEventListener("DOMContentLoaded", function() {
		var lazyloadImages;
		var lang = 	document.documentElement.lang;
		var mode = 	document.body.dataset.mode;
		
		if ("IntersectionObserver" in window) {		
			lazyloadImages = document.querySelectorAll(".lazy");
			var imageObserver = new IntersectionObserver(function(entries, observer) {
				entries.forEach(function(entry) {
					if (entry.isIntersecting) {
						var image = entry.target;
						
						if (image.dataset.src) {
							
							if (image.tagName.toLowerCase() === "video") {
								image.controls.true;
								image.loop = true;
								if (fullMotion) {
									image.autoplay = true;
									image.controls = false;
								}				
								image.src = '/videos/' + lang +  '/' + image.dataset.src;
							}
							
							if (image.tagName.toLowerCase() === "img") {
								if (image.id.indexOf('interface') >= 0) {
									image.src = '/images/' + lang + '/' + image.dataset.src;
								} else {
									image.src = '/images/' + lang +  '/' + mode + '/' + image.dataset.src;
								}
							}
						}
						
						image.classList.add("loaded");
						image.classList.remove("lazy");
						imageObserver.unobserve(image);
					}
				});
			});
			
			lazyloadImages.forEach(function(image) {
				imageObserver.observe(image);
			});
		} else {  
			var lazyloadThrottleTimeout;
			lazyloadImages = document.querySelectorAll(".lazy");
			
			function lazyload () {
				if(lazyloadThrottleTimeout) {
					clearTimeout(lazyloadThrottleTimeout);
				}	
				
				lazyloadThrottleTimeout = setTimeout(function() {
					var scrollTop = window.pageYOffset;
					lazyloadImages.forEach(function(img) {
						if(img.offsetTop < (window.innerHeight + scrollTop)) {
							if (img.dataset.src) {
								img.src = img.dataset.src;
							}
							img.classList.remove('lazy');
							img.classList.add('loaded');
						}
					});
					if(lazyloadImages.length == 0) { 
						document.removeEventListener("scroll", lazyload);
						window.removeEventListener("resize", lazyload);
						window.removeEventListener("orientationChange", lazyload);
					}
				}, 20);
			}
			
			document.addEventListener("scroll", lazyload);
			window.addEventListener("resize", lazyload);
			window.addEventListener("orientationChange", lazyload);
		}
	});
}

// Helper function to load external script
function loadJS(url, callback){

	var js = document.createElement("script")
	js.type = "text/javascript";

	js.onload = function(){
		callback();
	};

	js.src = url;
	document.body.appendChild(js);
}

//! Load the WebGL

var starfield;

if (webgl && fullMotion && frontpage) {
	
	loadJS("/nova-starfield.min.js", function(){
		var opening = document.querySelector("#opening").offsetTop;
		var editor = document.querySelector("#the_editor").offsetTop;
		
		starfield = new WebGLBackground({
			// Canvas and button are mandatory options
			canvas: document.querySelector("#starfield"),
			button: document.querySelector("#download-button"),
			
			// Starfield background color. Defaults to #080f24.
			backgroundColor: "#080f24",
			
			// Whether the starfield should constantly be centered on the button element. Default is true.
			followButton: true,
			
			// Controls the number of stars. Default is 1500.
			starCount: 1500,
			
			// The range of page scroll values (in pixels) at which the stars should be completely visible and completely hidden.
			// The stars will have full opacity before the first scroll threshold, interpolate opacity between first and second threshold, 
			// then be completely hidden after the second treshold.
			// Default is [window.innerHeight, window.innerHeight * 2].
			// starsScrollRange: [500, 1500],
			starsScrollRange: [opening, editor],	
			
			// Same as above, but for the nebula clouds.
			// Suggestion: we think it looks better if the stars fade out just a little after the clouds.
			// cloudsScrollRange: [500, 1250],
			cloudsScrollRange: [opening, (editor - 100)],
			
			// Intensity of the starfield in idle mode ('intensity' affects speed, length and thickness of stars).
			// Defaults to 0. (We suggest leaving this to zero).
			idleIntensity: 0,
			
			// Intensity of the starfield when pressing down a mouse button.
			// Defaults to 1. Put the same value as idle here to disable the acceleration on click.
			clickIntensity: 0,
			
			// Intensity of the starfield when the mouse cursor is hovering the specified button element.
			// Defaults to 1.5.
			buttonIntensity: 1.5
		});
		
		/* 
		In case you need to change the scroll range values after page load, for example because the window
		has been resized resulting in a layout change, you can directly update the properties.
		*/
		// window.addEventListener("resize", function() {
		//	 starfield.starsScrollRange = [0, 2000];
		//	 starfield.cloudsScrollRange = [0, 1500];
		// });
		//
		window.addEventListener("resize", function() {
			starfield.starsScrollRange = [opening, editor];
			starfield.cloudsScrollRange = [opening, (editor-100)];
		});
	});
	
	var pauseButton = document.createElement("button");
	pauseButton.id = "pauseButton";
	pauseButton.title = "Stop animations";
	
	pauseButton.addEventListener("click", function(){
		if (starfield.app.renderLoop.paused) {
			starfield.app.renderLoop.resume();
			pauseButton.title = "Stop animations";

		}
		else {
			starfield.app.renderLoop.pause();
			pauseButton.title = "Resume animations";

		}
		document.body.classList.toggle('reduce-motion');
		this.classList.toggle("paused");
	});
	
	document.body.appendChild(pauseButton);
}

//! Fix the top navbar

function fixtopbar () {
	var topbar = document.querySelector("nav.top");
	var scrollTop = window.pageYOffset;
	
	if (window.scrollY > topbar.offsetHeight) {
		topbar.classList.add("scrolled");
	} else {
		topbar.classList.remove("scrolled");
	}
}

document.addEventListener("scroll", fixtopbar);
window.addEventListener("resize", fixtopbar);
window.addEventListener("orientationChange", fixtopbar);

//! Toggle Download Pop-Up

var downloadButton = document.querySelector('#download-button');
var downloadNavButton = document.querySelector('li#download');
var downloadModal = document.querySelector('div.modal');

function downloadNova(e){
	showDownloadPop(e);
	window.location.assign(downloadNavButton.childNodes[1].href);
	e.preventDefault();
	e.stopPropagation();
	return false
}

function showDownloadPop(e) {
	document.body.classList.add("modal");
	downloadModal.addEventListener("mouseup", hideDownloadPop);
}

function hideDownloadPop(e) {
	document.body.classList.remove("modal");
	downloadModal.removeEventListener("mouseup", hideDownloadPop);
}

if (frontpage) { 
	downloadButton.addEventListener("click", downloadNova);
}

downloadNavButton.addEventListener("click", downloadNova);

//! Handle Incoming Download Links
var loc = (document.location.href).toLowerCase();

if (loc.indexOf('#download') > -1) {
	downloadNova();
}