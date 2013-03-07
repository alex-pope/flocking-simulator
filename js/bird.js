window.Flocking = ( function(Flocking) {
	var Bird = function() {
		this.acceleration = new Flocking.Point(0, 0);
		this.velocity_current = new Flocking.Point(0, 0);
		this.velocity_desired = new Flocking.Point(0, 0);
		this.position = new Flocking.Point(
			Flocking.graphics.right * Math.random(),
			Flocking.graphics.bottom * Math.random());
		this.max_speed = 8;
	};
	
	Flocking.Bird = Bird;
	
	return Flocking;
} )(window.Flocking || {});