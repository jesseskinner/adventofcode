import split from 'split';

let sum = 0;

process.stdin
	.pipe(split())
	.on('data', (line) => {
		if (!line) return;

		let [_, numbers] = line.split(':');
		const parts = numbers.split('|');
		const winning = new Set(Array.from(parts[0].matchAll(/[0-9]+/g)).map((n) => n[0]));

		let count = 0;

		for (const n of parts[1].matchAll(/[0-9]+/g)) {
			if (winning.has(n[0])) count++;
		}

		if (count) sum += Math.pow(2, count - 1);
	})
	.on('end', () => {
		console.log(sum);
	});
