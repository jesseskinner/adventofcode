import split from 'split';

const lines = [];

const rSymbol = /[^0-9.]/;

process.stdin
	.pipe(split())
	.on('data', (line) => {
		if (line) lines.push(line);
	})
	.on('end', () => {
		let sum = 0;

		for (let i = 0; i < lines.length; i++) {
			const line = '' + lines[i];

			for (const m of line.matchAll(/[0-9]+/g)) {
				const number = +m[0];
				const numLength = m[0].length;

				const start = Math.max(0, m.index - 1);
				const end = Math.min(line.length, m.index + numLength + 1);

				if (
					(i > 0 && rSymbol.test(lines[i - 1].slice(start, end))) ||
					(i + 1 < lines.length && rSymbol.test(lines[i + 1].slice(start, end))) ||
					rSymbol.test(line.slice(start, end))
				) {
					sum += number;
				}
			}
		}

		console.log(sum);
	});
