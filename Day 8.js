{
	const input = document.querySelector('pre').innerText.split('\n').filter(l => l !== '')
	const trees = input.map(l => [...l].map(t => ({ height: ~~t, visible: false })))
	
	let r = -1
	let c = -1
	let last_height = -1

	const directions = () => [
		{
			init: () => r = c = -1,
			next_row: () => (
				c = -1,
				++r < trees.length
			),
			next_column: () => ++c < trees[0].length
		},
		{
			init: () => r = c = -1,
			next_row: () => (
				r = -1,
				++c < trees[0].length
			),
			next_column: () => ++r < trees.length
		},
		{
			init: () => { r = trees.length; c = trees[0].length },
			next_row: () => (
				c = trees[0].length,
				--r > -1
			),
			next_column: () => --c > -1
		},
		{
			init: () => { r = trees.length; c = trees[0].length },
			next_row: () => (
				r = trees.length,
				--c > -1
			),
			next_column: () => --r > -1
		}
	]
	
	directions().forEach(d => {
		d.init()

		while (d.next_row()) {
			last_height = -1

			while (d.next_column()) {
				if (trees[r][c].height > last_height) {
					trees[r][c].visible = true
					last_height = trees[r][c].height
				}
			}
		}
	})

	trees.forEach((line, i) => line.forEach((t, j) => {
		const t_directions = directions()
		
		t_directions.forEach(d => {
			r = i
			c = j
			
			d.visibility = 0

			while (d.next_column()) {
				++d.visibility

				if (trees[r][c].height < t.height)
					last_height = trees[r][c].height
				else break
			}
		})

		t.score = t_directions.reduce((acc, d) => acc * d.visibility, 1)
	}))

	const forest = trees.flat()

  	console.table({
		'Sum of the smallest directories': forest.filter(t => t.visible).length,
		'Highest visibility score': Math.max(...forest.map(t => t.score))
	})
}
