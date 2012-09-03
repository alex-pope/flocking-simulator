//------------------------------------------------
// Flock extending Array for handling flock
// duties. 
//------------------------------------------------

// TODO: make simple collision correction
// TODO: add color to birds?

window.Flocking = ( function(Flocking, undefined) {
    Flocking.Flock = function(flockSize) {
        var _flock = new Array(flockSize);
		
		_flock.ticks = 0;
		_flock.tickLimit = 5000;
		_flock.changeTarget = true;
		_flock.target = new Flocking.Point(
			Flocking.BOUNDS_MAX.x / 2,
			Flocking.BOUNDS_MAX.y / 2
		);
		_flock.birdsLastPos = new Array(flockSize);
		
        for(var i = 0; i < flockSize; ++i) {
            _flock[i] = new Flocking.Bird(_flock);
			_flock.birdsLastPos[i] = new Flocking.Point(
				_flock[i].pos.x,
				_flock[i].pos.y
			);
        }
		
        _flock.update = function(td) {
			// change target after tickLimit has been reached
			_flock.ticks += td;
			if (_flock.changeTarget && _flock.ticks >= _flock.tickLimit) {
				_flock.ticks -= _flock.tickLimit;
				
				_flock.target.x = Flocking.BOUNDS_MAX.x * Math.random();
				_flock.target.y = Flocking.BOUNDS_MAX.y * Math.random();
			}
			
			// update each bird
            for(var i = 0, flockSize = _flock.length; i < flockSize; ++i) {
                _flock[i].update();
            }
			
			// cache new positions for next update
			for(i = 0; i < flockSize; ++i) {
                _flock.birdsLastPos[i].x = _flock[i].pos.x;
				_flock.birdsLastPos[i].y = _flock[i].pos.y;
            }
            
            return;
        };
            
        return _flock;
    };
    
    return Flocking;
} )(window.Flocking || {});