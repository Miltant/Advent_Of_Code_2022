{
  const input = document.body.innerText.split('\n\n')
  const pairs = input.map(pair => pair.split('\n').filter(l => l !== '').map(l => JSON.parse(l)))
  
  const compare = (a, b) => {
    if (typeof a === 'number' && typeof	b === 'number')  {
      return a - b
    } else {
      if (typeof a === 'number')
        a = [a]
      if (typeof b === 'number')
        b = [b]
      
      const min_length = Math.min(a.length, b.length)
      for (let i = 0; i < min_length; ++i) {
        const ret = compare(a[i], b[i])
        if (ret !== 0) return ret
      }
      
      return compare (a.length, b.length)
    }
  }
  
  const sum_of_unordered_pairs_index = pairs.reduce((acc, pair, i) => {
    if (compare(pair[0], pair[1]) < 0)
    	return acc + i + 1
    else return acc
  }, 0)
  
  let lines = pairs.flat()
  lines.push([[2]])
  lines.push([[6]])
  lines = lines.sort(compare)
  
  const decoder_key = lines.reduce((acc, line, i) => {
    if (line.length === 1 && line[0].length === 1) {
      if (line[0][0] === 2 || line[0][0] === 6)
        return (i + 1) * acc
    }
    return acc
  }, 1)
  
  console.table({
    'Sum of unordered pairs indexes': sum_of_unordered_pairs_index,
    'Decoder key': decoder_key
  })
}
