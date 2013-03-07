window.Flocking = ( function(Flocking) {
	var Flock = function(flock_size) {
		this.flock_size = flock_size;
		this.birds = [];
		this.birds.length = flock_size;
		for(var b = 0; b < flock_size; ++b) {
			this.birds[b] = new Flocking.Bird();
		}
		this.ticks = 0;
		this.tick_limit = 2500;
		this.change_target = true;
		this.target = new Flocking.Point(
			Flocking.graphics.right / 2,
			Flocking.graphics.bottom / 2
		);
		this.neighbor_distance = 30;
		this.target_distance = 100;
		this.ease_ratio = 0.025;
	};
	
	Flock.prototype.update = function(td) {
		// change target after tickLimit has been reached
		this.ticks += td;
		if (this.change_target && this.ticks >= this.tick_limit) {
			this.ticks -= this.tick_limit;
			this.target.x = Flocking.graphics.right * Math.random();
			this.target.y = Flocking.graphics.bottom * Math.random();
		}
		
		// calculate distances between neighbors and set
		var i, j, // counters
			b, n, // short references to birds
			v, // short reference to velocity_desired
			d_x, d_y, len; // distance and magnitude related variables
			
		// reset desired velocity for each bird O(n)
		for (i = 0; i < this.flock_size; ++i) {
			v = this.birds[i].velocity_desired;
			v.x = 0;
			v.y = 0;
		}
		
		// compare unique distances between birds O(n*n/2)?
		// push neighbors opposite of eachother
		for (i = 0; i < this.flock_size; ++i) {
			b = this.birds[i];
			for (j = i + 1; j < this.flock_size; ++j) {
				n = this.birds[j];
				
				d_x = n.position.x - b.position.x;
				d_y = n.position.y - b.position.y;
				
				len = Math.sqrt(d_x * d_x + d_y * d_y);
				
				if (len > 0 && len < this.neighbor_distance) {
					d_x /= len;
					d_y /= len;
				} else {
					d_x = 0;
					d_y = 0;
				}
				
				b.velocity_desired.x += -d_x;
				b.velocity_desired.y += -d_y;
				n.velocity_desired.x += d_x;
				n.velocity_desired.y += d_y;
			}
		}
		
		// calculate various directions on each bird O(n)
		for (i = 0; i < this.flock_size; ++i) {
			b = this.birds[i];
			
			// make bird desired velocity unit length
			v = b.velocity_desired;
			
			len = Math.sqrt(v.x * v.x + v.y * v.y);
			
			if (len !== 0) {
				v.x /= len;
				v.y /= len;
			}
			
			// compare bird position to target
			d_x = this.target.x - b.position.x;
			d_y = this.target.y - b.position.y;
			
			len = Math.sqrt(d_x * d_x + d_y * d_y);
			
			if (len > 0 && len > this.target_distance) {
				d_x /= len;
				d_y /= len;
			} else {
				d_x = 0;
				d_y = 0;
			}
			
			// add this to desired velocity and make unit length
			v.x += d_x;
			v.y += d_y;
			
			len = Math.sqrt(v.x * v.x + v.y * v.y);
			
			if (len !== 0) {
				len = b.max_speed / len;
				
				v.x *= len;
				v.y *= len;
			}
			
			// ease acceleration to desired velocity
			b.acceleration.x = this.ease_ratio * (v.x - b.velocity_current.x);
			b.acceleration.y = this.ease_ratio * (v.y - b.velocity_current.y);
			
			// apply acceleration
			b.velocity_current.x += b.acceleration.x;
			b.velocity_current.y += b.acceleration.y;
			
			// apply velocity
			b.position.x += b.velocity_current.x;
			b.position.y += b.velocity_current.y;
		} 
	};
	
	Flocking.Flock = Flock;
	
	return Flocking;
} )(window.Flocking || {});
