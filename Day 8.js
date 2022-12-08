{
	const input = document.querySelector('pre').innerText.split('\n').filter(l => l !== '')
	const forest = input.map(l => [...l].map(t => ({ height: ~~t, visible: false, score: 0 })))
	
	let r = -1
	let c = -1

	const directions_factory = () => [
		{
			init: () => r = c = -1,
			next_row: () => (
				c = -1,
				++r < forest.length
			),
			next_column: () => ++c < forest[0].length
		},
		{
			init: () => r = c = -1,
			next_row: () => (
				r = -1,
				++c < forest[0].length
			),
			next_column: () => ++r < forest.length
		},
		{
			init: () => { r = forest.length; c = forest[0].length },
			next_row: () => (
				c = forest[0].length,
				--r > -1
			),
			next_column: () => --c > -1
		},
		{
			init: () => { r = forest.length; c = forest[0].length },
			next_row: () => (
				r = forest.length,
				--c > -1
			),
			next_column: () => --r > -1
		}
	]
	
	directions_factory().forEach(d => {
		d.init()

		while (d.next_row()) {
			let last_height = -1

			while (d.next_column()) {
				if (forest[r][c].height > last_height) {
					forest[r][c].visible = true
					last_height = forest[r][c].height
				}
			}
		}
	})

	forest.forEach((line, i) => line.forEach((t, j) => {
		t.score = directions_factory().reduce((acc, d) => {
			r = i
			c = j
			let visibility = 0
			
			while (d.next_column()) {
				++visibility

				if (forest[r][c].height >= t.height)
					break
			}
			
			return acc * visibility
		}, 1)
	}))

	const trees = forest.flat()

	console.table({
		'Sum of the smallest directories': trees.filter(t => t.visible).length,
		'Highest visibility score': Math.max(...trees.map(t => t.score))
	})
}
