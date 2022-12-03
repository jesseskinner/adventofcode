import split from 'split';

const priorities = '_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

let sum = 0;

process.stdin
	.pipe(split())
	.on('data', (line) => {
		const left = line.substr(0, line.length / 2);
		const right = line.substr(line.length / 2);

		for (const letter of left.split('')) {
			if (right.indexOf(letter) !== -1) {
				sum += priorities.indexOf(letter);
				return;
			}
		}
	})
	.on('end', () => {
		console.log(sum);
	});
