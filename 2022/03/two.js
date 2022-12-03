import split from 'split';

const priorities = '_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

let sum = 0;

let group = [];

process.stdin
	.pipe(split())
	.on('data', (line) => {
		group.push(line);

		if (group.length === 3) {
			for (const letter of group[0]) {
				if (group[1].indexOf(letter) !== -1 && group[2].indexOf(letter) !== -1) {
					sum += priorities.indexOf(letter);
					break;
				}
			}

			group.length = 0;
		}
	})
	.on('end', () => {
		console.log(sum);
	});
