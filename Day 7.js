{
  const input = document.querySelector('pre').innerText.split('$ ')
	
  class File {
    constructor(name, size) {
      this.name = name
      this.size = size
    }
  }
  class Folder extends File{
    constructor(parent, name, children) {
			super(name, 0)
      this.parent = parent
      this.children = children
			this.invalidate_size()
    }
		add(...children) {
			this.children.push(...children)
			this.invalidate_size()
		}
    invalidate_size() {
      this.size = this.children.reduce((acc, cur) => acc + cur.size, 0)
			this.parent?.invalidate_size()
    }
  }

	const folders_repertoire = []
	let current_folder = null
	let root = null

	function make_dir(name) {
		const folder = new Folder(current_folder, name, [])
		folders_repertoire.push(folder)

		if (current_folder)
			current_folder.children.push(folder)
		
		return folder
	}

	function cd(name) {
		if (name === '..') {
			current_folder = current_folder.parent ?? current_folder
		} else {
      let folder = current_folder?.children?.find(c => c instanceof Folder && c.name === name)
      if (!folder) {
        folder = make_dir(name)
				root = folder
			}
      current_folder = folder
    }
	}

	function ls(list) {
		const files = []
		list.forEach(c => {
			const c_pair = c.split(' ')

			if (c_pair[0] === 'dir') {
				make_dir(c_pair[1])
			} else {
				files.push(new File(c_pair[1], ~~c_pair[0]))
			}
		})
		current_folder.add(...files)
	}
	
	input.forEach(buffer => {
		if (buffer.startsWith('cd')) {
			cd(buffer.slice(3, buffer.length-1))
		} else if (buffer.startsWith('ls')) {
			ls(buffer.slice(3, buffer.length-1).split('\n'))
		} else if (buffer !== '') {
			console.error('unknown command')
			debugger
		}
	})

	const total_disk_space = 70000000
	const free_space_needed = 30000000
	const additional_free_space_needed = free_space_needed + root.size - total_disk_space

	folders_repertoire.sort((a, b) => a.size - b.size)

  console.table({
		'Sum of the smallest directories': folders_repertoire.filter(f => f.size <= 100000).reduce((acc, f) => acc + f.size, 0),
		'Smallest directory that could be deleted to free enough space': {folder: folders_repertoire.find(f => f.size >= additional_free_space_needed)}
	})
}
