{
  const input = document.querySelector('pre').innerText.split('\n')
  let current_state_X = 1
  const states = [current_state_X]

  input.forEach(l => {
    states.push(current_state_X)

    const instruction = l.split(' ')
    if (instruction[0] === 'addx')
      states.push(current_state_X += ~~instruction[1])
  })

	let CRT = states.map((sprite_position, CRT_position) => Math.abs(sprite_position - CRT_position % 40) < 2 ? '#' : '.')
  
  document.write(`Signal strength: <output contenteditable>${states[19] * 20 + states[59] * 60 + states[99] * 100 + states[139] * 140 + states[179] * 180 + states[219] * 220}</output><br>`)
  document.write(`<textarea cols=40 rows=6 style="line-height:1ex;resize:none;overflow:hidden;font-family: monospace;">${CRT.join('')}</textarea>`)
}
