import split from 'split';

let sum = 0;

process.stdin
	.pipe(split())
	.on('data', (line) => {
		if (line) {
			const [name, outcome] = line.split(': ');
			const [_, id] = name.split(' ');

			const sets = outcome.split('; ');

			const min = { red: 0, green: 0, blue: 0 };

			for (const s of sets) {
				const cubes = s.split(', ');

				for (const c of cubes) {
					let [number, color] = c.split(' ');

					min[color] = Math.max(min[color], +number);
				}
			}

			sum += min.red * min.green * min.blue;
		}
	})
	.on('end', () => {
		console.log(sum);
	});
