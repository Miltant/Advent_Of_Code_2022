{
    const input = document.querySelector('pre').innerText.split('\n\n')
    const declaration_section = input[0].split('\n')
    const data_columns_indexes = [...declaration_section[declaration_section.length - 1].matchAll(/\d/g)].map(match => match.index)
    const data_columns = declaration_section.slice(0, declaration_section.length - 1).reverse()

    const data_crane9000 = data_columns_indexes.map(i => data_columns.map(l => l[i]).filter(l => l !== ' '))
    const data_crane9001 = structuredClone(data_crane9000)
    const instructions = [...input[1].matchAll(/move (\d+) from (\d) to (\d)/g)]

    instructions.forEach(match => {
        for (let _ = 0; _ < match[1]; ++_)
            data_crane9000[match[3]-1].push(data_crane9000[match[2]-1].pop())
    })
    instructions.forEach(match => {
        data_crane9001[match[3]-1].push(...Array(~~match[1]).fill('').map(_=>data_crane9001[match[2]-1].pop()).reverse())
    })

    console.table({
        'Stack tops for the crane 9000': data_crane9000.map(d => d[d.length - 1]).join(''),
        'Stack tops for the crane 9001': data_crane9001.map(d => d[d.length - 1]).join('')
    })
}
