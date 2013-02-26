//------------------------------------------------
// Simple Point object for holding {x, y} values;
//------------------------------------------------

window.Flocking = ( function(Flocking, undefined) {
	function Point(x, y) {
		this.x = x || 0;
		this.y = y || 0;
		
		return this;
	};

	Flocking.Point = Point;

	return Flocking;
} )(window.Flocking || {});
