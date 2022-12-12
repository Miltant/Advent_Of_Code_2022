{
  const height_start = 'a'.charCodeAt(0) - 1
  let start = [-1, -1]
  let end = [-1, -1]
  
  class Cell {
    distance_to_start = -1
    
    constructor (x, y, h) {
      this.label = h
      switch (h) {
        case 'S': {
          start = [x, y]
          this.height = 1
          this.distance_to_start = 0
          break
        }
        case 'E': {
          end = [x, y]
          this.height = 27
          break
        }
        default:
          this.height = h.charCodeAt(0) - height_start
      }
    }
  }
  
  const input = document.body.innerText.split('\n')
  const grid = input.filter(l => l !== '').map((l, i) => [...l].map((c, j) => new Cell(i, j, c)))
  
  const find_shortest_distance = (grid, start, end, climbing_condition) => {
    let last_layer = [start]
    const directions = [
      (([x, y]) => [x+1, y]),
      (([x, y]) => [x-1, y]),
      (([x, y]) => [x, y+1]),
      (([x, y]) => [x, y-1])
    ]


    while (end.every(e => grid[e[0]][e[1]].distance_to_start <= 0)) {
      let current_layer = []

      last_layer.forEach(cell_coords => {
        const cell = grid[cell_coords[0]][cell_coords[1]]

        directions.forEach(dir => {

          const coords_to_explore = dir(cell_coords)
          if (coords_to_explore[0] >= 0 && coords_to_explore[0] < grid.length) {
            if (coords_to_explore[1] >= 0 && coords_to_explore[1] < grid[0].length) {
              const cell_to_explore = grid[coords_to_explore[0]][coords_to_explore[1]]

              if (
                cell_to_explore.distance_to_start < 0 &&
                climbing_condition(cell_to_explore.height, cell.height)
              )
              {
                cell_to_explore.distance_to_start = cell.distance_to_start + 1
                current_layer.push(coords_to_explore)
              }
            }
          }
        })
      })

      last_layer = current_layer
    }
    
    const min_end = end
    	.filter(e => grid[e[0]][e[1]].distance_to_start >= 0)
    	.sort((a, b) => b.distance_to_start - a.distance_to_start)
    	[0]
    return grid[min_end[0]][min_end[1]].distance_to_start
  }

  const grid_start = structuredClone(grid)
  const min_path_from_start = find_shortest_distance(grid_start, start, [end], (a, b) => a <= b + 1)
  
  const ground = grid.flat()
  	.map((c, i) => c.height === 1 ? [Math.floor(i / grid[0].length), i % grid[0].length] : undefined)
  	.filter(c => c)
  
  const grid_end = structuredClone(grid)
  grid_end[start[0]][start[1]].distance_to_start = -1
  grid_end[end[0]][end[1]].distance_to_start = 0
  const min_path_from_the_ground = find_shortest_distance(grid_end, end, ground, (a, b) => b <= a + 1)
  
  document.body.innerHTML = grid_start.map(l => l.map(c =>
		c.distance_to_start < 0 ?
		c.label:
		`<span data-height="${c.height}" data-dist="${c.distance_to_start}" style="background-color: hsl(${c.distance_to_start *2 % 360}, 100%, 40%)">${c.label}</span>`
	).join('') + '<br>').join('')
  document.body.style.fontFamily = 'monospace'
  console.table({
    'Min steps to the end': min_path_from_start,
    'Min steps from anywhere on the ground': min_path_from_the_ground
  })
}
