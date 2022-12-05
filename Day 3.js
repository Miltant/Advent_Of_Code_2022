{
	const input = document.querySelector('pre').innerText.split('\n').filter(l => l !== '')

	const char_code_of_A = 'A'.charCodeAt(0)
	const char_code_of_a = 'a'.charCodeAt(0)

	const priority_of = item => {
		const char_code_of_item = item.charCodeAt(0)

		if (char_code_of_item >= char_code_of_a)
			return char_code_of_item - char_code_of_a + 1
		else
			return char_code_of_item - char_code_of_A + 27
	}

	const sum_for_rucksacks = input.reduce((acc, cur) => {
		const first_rucksack = cur.slice(0, cur.length / 2)
		const second_rucksack = cur.slice(cur.length / 2)

		const intersection = [...first_rucksack].find(item => second_rucksack.includes(item))

		return acc + priority_of(intersection)
	}, 0)

	const groups_of_three = input.map((val, index) => input.slice(index * 3, index * 3 + 3))

	const sum_for_groups = groups_of_three.reduce((acc, cur) => {
		const first_two_intersection = [...cur[0]].filter(item => cur[1].includes(item))
		const intersection = [...cur[2]].find(item => first_two_intersection.includes(item))

		return acc + priority_of(intersection)
	}, 0)


	console.table({
		"Sum of rucksacks priorities": sum_for_rucksacks,
		"Sum of group badges priorities": sum_for_groups
	})
}
