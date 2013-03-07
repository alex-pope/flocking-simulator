window.Flocking = ( function(Flocking) {
	var Graphic = function(x, y) {
		// x, y default to 0
		// empty render as placeholder
		this.x = x || 0;
		this.y = y || 0;
		this.render = function() {};
	};
	
	// Allows for graphic objects to access graphics members
	Graphic.prototype = Flocking.graphics;
	
	// Expose Graphic by attaching to Flocking module
	Flocking.Graphic = Graphic;
	
	return Flocking;
} )(window.Flocking || {});