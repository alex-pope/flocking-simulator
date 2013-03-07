window.Flocking = ( function(Flocking) {
	var Fps = function() {
		this.ticks = 0;
		this.tick_limit = 125;
		this.fps = 0;
		this.position = new Flocking.Point(Flocking.graphics.left + 8, Flocking.graphics.bottom - 8);
	};
	
	Fps.prototype.update = function(td) {
		this.ticks += td;

		if (this.ticks >= this.tick_limit) {
			this.ticks -= this.tick_limit;
			this.fps = td === 0 ? 1000 : Math.round(1000 / td);
		}
	};
	
	Flocking.Fps = Fps;
	
	return Flocking;
} )(window.Flocking || {});
