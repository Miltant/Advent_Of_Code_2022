{
	const input = document.querySelector('pre').innerText.split('\n').filter(l => l !== '')
	const ranges = input.map(l => l.split(',').map(r => r.split('-').map(n => ~~n)))

	const redundancy_test = r => (r[0][0]<=r[1][0] && r[0][1]>=r[1][1]) || (r[0][0]>=r[1][0] && r[0][1]<=r[1][1])
	const overlap_test = r => (r[0][0]<=r[1][0] && r[0][1]>=r[1][0]) || (r[0][0]<=r[1][1] && r[0][1]>=r[1][1])

	console.table({
		"Count of pairs containing the other": ranges.filter(r => redundancy_test(r)).length,
		"Count of overlapping or redundant pairs": ranges.filter(r => redundancy_test(r) || overlap_test(r)).length
	})
}
