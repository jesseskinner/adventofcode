import split from 'split';

let count = 0;
const multipliers = [];

process.stdin
	.pipe(split())
	.on('data', (line) => {
		if (!line) return;

		let [_, numbers] = line.split(':');
		const parts = numbers.split('|');
		const winning = new Set(Array.from(parts[0].matchAll(/[0-9]+/g)).map((n) => n[0]));

		let wins = 0;
		const multiplier = (multipliers.shift() ?? 0) + 1;

		for (const n of parts[1].matchAll(/[0-9]+/g)) {
			if (winning.has(n[0])) wins++;
		}

		for (let i = 0; i < wins; i++) {
			if (!multipliers[i]) multipliers[i] = 0;
			multipliers[i] += multiplier;
		}

		count += multiplier;
	})
	.on('end', () => {
		console.log(count);
	});
