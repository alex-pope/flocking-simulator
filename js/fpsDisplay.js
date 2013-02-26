//------------------------------------------------
// Frames Per Second Object for handling Fps
// related duties
//------------------------------------------------

window.Flocking = ( function(Flocking, undefined) {
	function FpsDisplay(pos) {
		this.pos = pos || new Flocking.Point(Flocking.BOUNDS_MIN.x, Flocking.BOUNDS_MAX.y);
		this.ticks = 0;
		this.tickLimit = 125;
		this.fps = 0;
		
		return this;
	};

	function update(td) {
		this.ticks += td;

		if (this.ticks >= this.tickLimit) {
			this.ticks -= this.tickLimit;
			this.fps = td !== 0 ? ((1000 / td) | 0) : 1000;
		}

		return;
	};

	Flocking.FpsDisplay = FpsDisplay;
	Flocking.FpsDisplay.prototype.update = update;

	return Flocking;
	
} )(window.Flocking || {});
