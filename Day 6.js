{
	const input = document.querySelector('pre').innerText

	const has_repeats = text => {
		for (let fully_checked = 0; fully_checked < text.length - 1; ++fully_checked)
			for (let i = fully_checked + 1; i < text.length; ++i)
				if (text[fully_checked] === text[i])
					return true
		return false
	}
	
	const find_first_repeated_slice = (text, length) => {
    let i = length - 2
		do ++i
    while (has_repeats(text.slice(i - length + 1, i + 1)))

		return i + 1
	}

	console.table({
		'Index of the first start-of-packet 4-marker':  find_first_repeated_slice(input, 4),
		'Index of the first start-of-packet 14-marker':  find_first_repeated_slice(input, 14)
	})
}
