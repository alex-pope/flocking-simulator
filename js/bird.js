window.Flocking = ( function(Flocking, undefined) {
	// 'static' members reused by each bird to save on allocations
	var _fromNeighbor = new Flocking.Point(0, 0);
	var _toTarget = new Flocking.Point(0, 0);
	var _direction = new Flocking.Point(0, 0);

	var _target,
		_neighbors,
		_flockSize,
		_fromNeighborLength,
		_toTargetLength,
		_directionLength;
	
	function Bird(flock) {
		this.acc = new Flocking.Point(0, 0);
		this.flock = flock;
		this.maxSpeed = 8;
		this.pos = new Flocking.Point(
			Flocking.BOUNDS_MAX.x * Math.random(),
			Flocking.BOUNDS_MAX.y * Math.random()
		);
		this.vel_c = new Flocking.Point(0, 0);
		this.vel_f = new Flocking.Point(0, 0);
		
		_target = this.flock.target;
		_neighbors = this.flock.birdsLastPos;
		_flockSize = _neighbors.length;
		
		return this;
	};
	
	function update() {
		_direction.x = 0;
		_direction.y = 0;
		
		// from neighbors calculations
		for (var i = 0; i < _flockSize; i++) {
			_fromNeighbor.x = this.pos.x - _neighbors[i].x;
			_fromNeighbor.y = this.pos.y - _neighbors[i].y;
			
			_fromNeighborLength =
				_fromNeighbor.x * _fromNeighbor.x +
				_fromNeighbor.y * _fromNeighbor.y;
			
			if (_fromNeighborLength !== 0) {
				_fromNeighborLength = Math.sqrt(_fromNeighborLength);
				_fromNeighbor.x /= _fromNeighborLength;
				_fromNeighbor.y /= _fromNeighborLength;
				
				if (_fromNeighborLength < 30) {
					_direction.x += _fromNeighbor.x;
					_direction.y += _fromNeighbor.y;
				}
			}
		}
		
		// to target calculations
		_toTarget.x = _target.x - this.pos.x;
		_toTarget.y = _target.y - this.pos.y;
		
		_toTargetLength =
			_toTarget.x * _toTarget.x +
			_toTarget.y * _toTarget.y;
		
		// don't bother adding to direction if 0
		if (_toTargetLength !== 0) {
			_toTargetLength = Math.sqrt(_toTargetLength);
			_toTarget.x /= _toTargetLength;
			_toTarget.y /= _toTargetLength;
			
			// don't bother adding (going toward target) if within 100 pixels
			if (_toTargetLength > 100) {
				_direction.x += _toTarget.x;
				_direction.y += _toTarget.y;
			}
		}
		
		// scale _direction to maxSpeed by getting components
		_directionLength = _direction.x * _direction.x + _direction.y * _direction.y;
		
		if (_directionLength !== 0) {
			_directionLength = Math.sqrt(_directionLength);
			_direction.x /= _directionLength;
			_direction.y /= _directionLength;
			
			this.vel_f.x = _direction.x * this.maxSpeed;
			this.vel_f.y = _direction.y * this.maxSpeed;
		}
		
		// 1/40th the difference between current and final velocity
		// for easing
		// then apply
		this.acc.x = 0.025 * (this.vel_f.x - this.vel_c.x);
		this.acc.y = 0.025 * (this.vel_f.y - this.vel_c.y);
		
		this.vel_c.x += this.acc.x;
		this.vel_c.y += this.acc.y;
		
		// apply velocity
		this.pos.x += this.vel_c.x;
		this.pos.y += this.vel_c.y;
		
		return;
	};
	
	Flocking.Bird = Bird;
	Flocking.Bird.prototype.update = update;
	
	return Flocking;
} )(window.Flocking || {});