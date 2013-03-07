window.Flocking = ( function(Flocking) {
	Flocking.onLoad = function() {
		Flocking.graphics.initialize();
		
		window.requestAnimationFrame = (
			window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function(callback) {
				window.setTimeout(callback, 1000 / 60);
			});
		
		// TODO: rename
		Flocking.__ti__ = Flocking.__tf__ = new Date();
		Flocking.__td__ = 0;
		
		Flocking.__fps__ = new Flocking.Fps();
		Flocking.__fps_graphic__ = new Flocking.Fps_Graphic(Flocking.__fps__);
		
		Flocking.__flock__ = new Flocking.Flock(50);
		Flocking.__flock_graphic__ = new Flocking.Flock_Graphic(Flocking.__flock__);
		
		// TODO: move this section to view controller object
		var canvas = Flocking.graphics.front_buffer,
			flock = Flocking.__flock__;
		var mouseMove = function(e) {
			var x = e.pageX - canvas.offsetLeft - 4;
			var y = e.pageY - canvas.offsetTop - 4;
			flock.target.x = x;
			flock.target.y = y;
		};
		canvas.change_target = true;
		canvas.addEventListener("click", function(e) {
			if ((canvas.change_target = !canvas.change_target)) {
				canvas.removeEventListener("mousemove", mouseMove);
				canvas.style.cursor = '';
				flock.change_target = true;
				flock.ticks = 0;
			} else {
				canvas.addEventListener("mousemove", mouseMove);
				canvas.style.cursor = 'none';
				flock.change_target = false;
			}
		});
		// End section
		
		Flocking.renderFrame();
	};
	
	Flocking.renderFrame = function() {
		window.requestAnimationFrame(Flocking.renderFrame);
		
		// time delta stuff
		Flocking.__ti__ = Flocking.__tf__;
		Flocking.__tf__ = new Date();
		Flocking.__td__ = Flocking.__tf__.getTime() - Flocking.__ti__.getTime();
		
		// update fpsDisplay
		Flocking.__fps__.update(Flocking.__td__);
		
		// update the flock
		Flocking.__flock__.update(Flocking.__td__);
		
		// clear the frame
		Flocking.graphics.clearBuffer();
		
		// render the fps
		Flocking.__fps_graphic__.render();
		
		// render the flock
		Flocking.__flock_graphic__.render();
		
		// display the frame
		Flocking.graphics.flipBuffer();
	};
	
	return Flocking;
} )(window.Flocking || {});
