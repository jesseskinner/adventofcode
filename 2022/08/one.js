import split from 'split';

let map = [];

process.stdin
	.pipe(split())
	.on('data', (line) => {
		map.push(line.split(''));
	})
	.on('end', () => {
		const trees = new Set();
		const width = map[0].length;
		const height = map.length;

		for (let y = 0; y < height; y++) {
			// from the left
			let max = -1;
			for (let x = 0; x < width; x++) {
				const tree = map[y][x];

				if (tree > max) {
					max = tree;
					trees.add([x, y].join('x'));
				}
			}

			// from the right
			max = -1;
			for (let x = width - 1; x >= 0; x--) {
				const tree = map[y][x];

				if (tree > max) {
					max = tree;
					trees.add([x, y].join('x'));
				}
			}
		}

		for (let x = 0; x < width; x++) {
			// from the top
			let max = -1;
			for (let y = 0; y < height; y++) {
				const tree = map[y][x];

				if (tree > max) {
					max = tree;
					trees.add([x, y].join('x'));
				}
			}

			// from the bottom
			max = -1;
			for (let y = height - 1; y >= 0; y--) {
				const tree = map[y][x];

				if (tree > max) {
					max = tree;
					trees.add([x, y].join('x'));
				}
			}
		}

		console.log(trees.size);
	});
