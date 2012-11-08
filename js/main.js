// TODO: write intro
// TODO: make separate update function, though introduces interpolation problem

window.Flocking = ( function(Flocking, undefined) {
	// globals of module
	var _bCanvas,
		_bContext,
		_canvas,
		_context,
		_birdCanvas,
		_birdContext,
		_flock,
		_ti, _tf, _td,
		_fps;
		
	// TODO: move canvases and contexts to stage/viewport/display object
	Flocking.init = function() {
		_bCanvas = document.createElement('canvas');
		_bCanvas.id = 'buffer';
		_bCanvas.width = Flocking.width;
		_bCanvas.height = Flocking.height;
		
		_bContext = _bCanvas.getContext('2d');
		_bContext.fillStyle = '#7F7F7F';
		_bContext.font = 'bold 32px sans-serif';
		
		_canvas = document.createElement('canvas');
		_canvas.id = 'canvas';
		_canvas.width = Flocking.width;
		_canvas.height = Flocking.height;
		_canvas.changeTarget = true; // used for switching between mouse target or random
		
		function mouseMove(e) {
			var x = e.pageX - _canvas.offsetLeft - 4;
			var y = e.pageY - _canvas.offsetTop - 4;
			
			_flock.target.x = x;
			_flock.target.y = y;
			
		};
		
		_canvas.onclick = function(e) {
			if ((_canvas.changeTarget = !_canvas.changeTarget)) {
				_canvas.onmousemove = null;
				_canvas.style.cursor = '';
				_flock.changeTarget = true;
				_flock.ticks = 0;
				
			}
			else {
				_canvas.onmousemove = mouseMove;
				_canvas.style.cursor = 'none';
				_flock.changeTarget = false;
				
			}
			
		};
		
		document.body.appendChild(_canvas);
		
		_context = _canvas.getContext('2d');
		
		// _birdCanvas = new Image();
		// _birdCanvas.src = Flocking.BIRD_IMG_URL;
		// _birdCanvas.width = Flocking.BIRD_IMG_WIDTH;
		// _birdCanvas.height = Flocking.BIRD_IMG_HEIGHT;
		_birdCanvas = document.createElement('canvas');
		_birdCanvas.width = Flocking.BIRD_IMG_WIDTH;
		_birdCanvas.height = Flocking.BIRD_IMG_HEIGHT;
		
		_birdContext = _birdCanvas.getContext('2d');
		_birdContext.fillStyle = '#99f';
		_birdContext.strokeStyle = '#000';
		_birdContext.beginPath();
		_birdContext.arc(4, 4, 3, 0, Math.PI*2, false);
		_birdContext.fill();
		_birdContext.stroke();
		_birdContext.closePath();
		
		_ti = _tf = new Date();
		_td = 0;
		
		_fps = new Flocking.FpsDisplay();
		
		_fps.render = function() {
			_bContext.fillText(this.fps, this.pos.x, this.pos.y);
			
			return;
			
		};
		
		_flock = new Flocking.Flock(50);
		
		_flock.render = function() {
			function _render(x, y) {
				// TODO: replace 8 with bird width/height somehow
				function wrap(boundary, value) {
					// shift everything over by bird size
					var modResult = (value + 8) % (boundary + 8);
					
					// modding negatives gives negatives, so shift 0 to other side
					if (modResult < 0) {
						return modResult + boundary;
						
					}
					// otherwise undo the original shift for positive modding result
					else {
						return modResult - 8;
						
					}
					
				}
				
				_bContext.drawImage(
					_birdCanvas,
					wrap(Flocking.width, x),
					wrap(Flocking.height, y),
					Flocking.BIRD_IMG_WIDTH,
					Flocking.BIRD_IMG_HEIGHT
					);
					
			}
			
			_render(_flock.target.x, _flock.target.y);
			
			for (var i = 0, bird; i < _flock.length; i++) {
				bird = _flock[i];
				_render(bird.pos.x, bird.pos.y);
				
			}
			
			return;
			
		}
		
		// shim to cover different browsers
		window.requestAnimationFrame = (
			window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function(callback) {
				window.setTimeout(callback, 1000 / 60);
				
			}
			);
		
		Flocking.render();
		
		return;
    };
    
    Flocking.render = function() {
    	window.requestAnimationFrame(Flocking.render);
    	
    	// time delta stuff
    	_ti = _tf;
    	_tf = new Date();
    	_td = _tf.getTime() - _ti.getTime();
    	
    	// update fpsDisplay
    	_fps.update(_td);
    	
    	// update the flock
    	_flock.update(_td);
    	
    	// render to buffer
    	
    	// last frame semi-transparent copied from the canvas
    	// _bContext.save();
    	// _bContext.globalCompositeOperation = 'copy';
    	// _bContext.globalAlpha = 0.85;
    	// _bContext.drawImage(
    		// _canvas,
    		// Flocking.BOUNDS_MIN.x,
    		// Flocking.BOUNDS_MIN.y,
		// Flocking.BOUNDS_MAX.x,
		// Flocking.BOUNDS_MAX.y);
	// _bContext.restore();

	_bContext.clearRect(Flocking.x, Flocking.y, Flocking.width, Flocking.height);
	_fps.render();
	_flock.render();
	
	// copy buffer to visible canvas
	_context.save();
	_context.globalCompositeOperation = 'copy';
	_context.drawImage(
		_bCanvas,
		Flocking.x,
		Flocking.y,
		Flocking.width,
		Flocking.height
		);
	
	_context.restore();
	
	return;
	}

	return Flocking;

} )(window.Flocking || {});