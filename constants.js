//------------------------------------------------
// Collection of constants declared for later use
// throughout the module
//------------------------------------------------

window.Flocking = ( function(Flocking, undefined) {
	Flocking.BOUNDS_MIN = new Flocking.Point(0, 0);
	Flocking.BOUNDS_MAX = new Flocking.Point(960, 540);
	
	Flocking.BIRDIMG_URL = 'http://i.imgur.com/bx226.png';
	Flocking.BIRDIMG_SIZE = new Flocking.Point(8, 8);
	
	// new stuff to be implemented
	Flocking.x = 0;
	Flocking.y = 0;
	Flocking.width = 960;
	Flocking.height = 540;
	Flocking.BIRD_IMG_URL = 'circle.png';
	Flocking.BIRD_IMG_WIDTH = 8;
	Flocking.BIRD_IMG_HEIGHT = 8;
	
	return Flocking;
} )(window.Flocking || {});