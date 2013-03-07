window.Flocking = ( function(Flocking) {
	var Flock_Graphic = function(flock) {
		this.target = flock.target;
		this.birds = flock.birds;
		this.flock_size = flock.flock_size;
	};
	
	Flock_Graphic.prototype = new Flocking.Graphic();
	
	Flock_Graphic.prototype.render = function() {
		var bird, b;
		
		this.renderBird(Math.round(this.target.x), Math.round(this.target.y));
		
		for (var b = 0; b < this.flock_size; ++b) {
			bird = this.birds[b];
			this.renderBird(Math.round(bird.position.x), Math.round(bird.position.y));
		}
	};
	
	Flocking.Flock_Graphic = Flock_Graphic;
	
	return Flocking;
} )(window.Flocking || {});