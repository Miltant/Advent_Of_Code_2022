{
	const number_of_knots = 2 //+ 8

	class Vec2 {
		constructor (x, y) {
			this.x = x
			this.y = y
		}
		is (vec) {
			return this.x === vec.x && this.y === vec.y
		}
		add (vec) {
			return new Vec2(this.x + vec.x, this.y + vec.y)
		}
		sub (vec) {
			return new Vec2(this.x - vec.x, this.y - vec.y)
		}
		times (scalar) {
			return new Vec2(this.x * scalar, this.y * scalar)
		}
		
		// using the infinite norm
		
		get modulus () {
			return Math.max(Math.abs(this.x), Math.abs(this.y))
		}
		get normalized () {
			return new Vec2(this.x / Math.abs(this.x) || 0, this.y / Math.abs(this.y) || 0)
		}
	}

	const unit_vec = {
		zero: new Vec2(0, 0),
		R: new Vec2(0, 1),
		L: new Vec2(0, -1),
		D: new Vec2(1, 0),
		U: new Vec2(-1, 0)
	}

	class Board {
		constructor () {
			//this.start_position = new Vec2(0, 0)
			this.knots_position = Array(number_of_knots).fill(new Vec2(0, 0))

			this.visited_cells = [new Vec2(0, 0)]
		}
		visit (pos) {
			if (this.visited_cells.findIndex(c => c.is(pos)) === -1)
				this.visited_cells.push(pos)
		}
		move_head (pos) {
			const unit = pos.normalized
			
			for (let _ = unit_vec.zero; _.modulus < pos.modulus; _ = _.add(unit)) {
				this.knots_position[0] = this.knots_position[0].add(unit)
				
				for (let i = 1; i < number_of_knots; ++i) {
					const rope = this.knots_position[i - 1].sub(this.knots_position[i])

					if (rope.modulus > 1) {
						this.knots_position[i] = this.knots_position[i].add(rope.normalized)
						
						// if it's the tail end
						if (i === number_of_knots - 1)
							this.visit(this.knots_position[i])
					}
				}
			}
		}
	}

	const input = document.querySelector('pre').innerText.split('\n')
	const board = new Board()

	input.forEach(l => {
		if (l === '') return

		let command = l.split(' ')
		board.move_head(unit_vec[command[0]].times(~~command[1]))
	})

	console.table({
		[`Number of cells visited by the tail of the ${number_of_knots}-knots rope`]: board.visited_cells.length
	})
}
