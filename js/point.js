//------------------------------------------------
// Simple Point object for holding {x, y} values;
//------------------------------------------------

window.Flocking = ( function(Flocking) {
	var Point = function(x, y) {
		this.x = x || 0;
		this.y = y || 0;
	};

	Flocking.Point = Point;

	return Flocking;
} )(window.Flocking || {});
