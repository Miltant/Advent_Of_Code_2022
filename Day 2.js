{
	const input = document.querySelector('pre').innerText

	const convert_table_ABC = {A:1, B:2, C:3}
	const convert_table_XYZ = {X:1, Y:2, Z:3}

	const score = (them, me) => {
		let score = me
		// draw
		if (me === them) score += 3
		// win
		if (me === them % 3 + 1) score += 6

		return score
	}

	const convert_and_score = round => {
		if (round.length !== 2) return 0

		const them = convert_table_ABC[round[0]]
		const me = convert_table_XYZ[round[1]]

		return score(them, me)
	}

	const optimal_score = round => {
		if (round.length !== 2) return 0

		const them = convert_table_ABC[round[0]]

		switch (round[1]) {
			case 'X': // loss
				return score(them, (them - 1) || 3)
			case 'Y': // draw
				return score(them, them)
			case 'Z': // win
				return score(them, them % 3 + 1)
		}
	}

	console.table({
		"First score guess": input.split('\n').reduce((acc, cur) => acc + convert_and_score(cur.split(' ')), 0),
		"Intended strategy score": input.split('\n').reduce((acc, cur) => acc + optimal_score(cur.split(' ')), 0)
	})
}
