window.Flocking = ( function(Flocking) {
	var Fps_Graphic = function(fps) {
		this.fps = fps;
	};
	
	Fps_Graphic.prototype = new Flocking.Graphic();
	
	Fps_Graphic.prototype.render = function() {
		var fps = this.fps;
		this.renderFps(fps.fps, fps.position.x, fps.position.y);
	};
	
	Flocking.Fps_Graphic = Fps_Graphic;
	
	return Flocking;
} )(window.Flocking || {});