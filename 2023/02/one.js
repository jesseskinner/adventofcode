import split from 'split';

let sum = 0;

const limits = { red: 12, green: 13, blue: 14 };

process.stdin
	.pipe(split())
	.on('data', (line) => {
		if (line) {
			const [name, outcome] = line.split(': ');
			const [_, id] = name.split(' ');

			const sets = outcome.split('; ');

			for (const s of sets) {
				const cubes = s.split(', ');

				for (const c of cubes) {
					let [number, color] = c.split(' ');

					if (+number > limits[color]) {
						return;
					}
				}
			}

			sum += +id;
		}
	})
	.on('end', () => {
		console.log(sum);
	});
