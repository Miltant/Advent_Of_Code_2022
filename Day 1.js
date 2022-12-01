{
    const input = document.querySelector('pre').innerText
    const elves = input.split('\n\n').map(
        elf => elf.split('\n').reduce((acc, cur) => acc + cur*1, 0)
    )
    const max_elf = Math.max(...elves)

    const umax_n = (arr, n) => {
        console.assert(n < arr.length, "There should be more items than top positions sought")
        let max_buffer = new Uint32Array(n)

        arr.forEach((item, item_index) => {
            let i = 0
            while (i < n) {
                if (max_buffer[i] < item) {
                    max_buffer.set(max_buffer.slice(i, n-1), i+1)
                    max_buffer[i] = item
                    break
                }
                ++i
            }
        })

        return max_buffer
    }
    const top3_elves = umax_n(elves, 3)
    
    console.table({
        "Max calories carried by one Elf": max_elf,
        "Three biggest amount of calories carried": top3_elves.reduce((acc, cur) => acc + cur, 0)
    })
}
