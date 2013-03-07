window.Flocking = ( function(Flocking) {
	// declare section-wide variables
	var __top__ = 0,
		__right__ = 800,
		__bottom__ = 600,
		__left__ = 0,
		__back_buffer__,
		__back_context__,
		__front_buffer__,
		__front_context__;
		
	// create and fill out back buffer and its context
	// invisible (not on DOM) for faster multiple drawing calls
	__back_buffer__ = document.createElement('canvas');
	__back_buffer__.id = '__back_buffer__';
	__back_buffer__.width = __right__;
	__back_buffer__.height = __bottom__;
	
	__back_context__ = __back_buffer__.getContext('2d');
	__back_context__.fillStyle = '#7F7F7F';
	__back_context__.font = 'bold 32px sans-serif';
	
	// create and fill out front buffer and its context
	// visible (on DOM) and __back_buffer__ is drawn on it once
	__front_buffer__ = document.createElement('canvas');
	__front_buffer__.id = '__front_buffer__';
	__front_buffer__.width = __right__;
	__front_buffer__.height = __bottom__;
	
	__front_context__ = __front_buffer__.getContext('2d');
	
	// create bird graphic
	__bird_image__ = document.createElement('canvas');
	__bird_image__.width = 8;
	__bird_image__.height = 8;
	
	__bird_context__ = __bird_image__.getContext('2d');
	__bird_context__.fillStyle = '#99f';
	__bird_context__.strokeStyle = '#000';
	__bird_context__.beginPath();
	__bird_context__.arc(4, 4, 3, 0, Math.PI*2, false);
	__bird_context__.fill();
	__bird_context__.stroke();
	__bird_context__.closePath();
	
	// __wrap__ is a helper function to keep graphic on the canvas
	var __wrap__ = function(boundary, size, value) {
		// shift everything over by size
		var mod_result = (value + size) % (boundary + size);
		
		if (mod_result < 0) {
			// modding negatives gives negatives, so shift to other side
			return mod_result + boundary;
		} else {
			// otherwise undo the original shift for positive modding result
			return mod_result - size;
		}
	};
	
	// Static singleton containing a lot of shared state and functions
	var graphics = {
		top: __top__,
		right: __right__,
		bottom: __bottom__,
		left: __left__,
		front_buffer: __front_buffer__,
		//back_context: __back_context__,
		//front_context: __front_context__,
		//bird_image: __bird_image__,
		initialize: function() {
			document.body.appendChild(__front_buffer__);
		},
		clearBuffer: function() {
			__back_context__.clearRect(__left__, __top__, __right__, __bottom__);
		},
		flipBuffer: function() {
			__front_context__.save();
			__front_context__.globalCompositeOperation = 'copy';
			__front_context__.drawImage(
				__back_buffer__,
				__left__,
				__top__,
				__right__,
				__bottom__);
			__front_context__.restore();
		},
		renderFps: function(text, x, y) {
			__back_context__.fillText(text, x, y);
		},
		renderBird: function(x, y) {
			x = __wrap__(__right__, 8, x);
			y = __wrap__(__bottom__, 8, y);
			
			__back_context__.drawImage(
				__bird_image__, x, y, 8, 8);
		}
	};
	
	// Expose graphics by attaching to Flocking module
	Flocking.graphics = graphics;
	
	return Flocking;
} )(window.Flocking || {});