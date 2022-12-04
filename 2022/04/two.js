import split from 'split';

const rParse = /(\d+)-(\d+),(\d+)-(\d+)/;

let count = 0;

process.stdin
	.pipe(split())
	.on('data', (line) => {
		if (!line) return;

		const m = rParse.exec(line);

		const a1 = +m[1];
		const a2 = +m[2];
		const b1 = +m[3];
		const b2 = +m[4];

		if ((a1 <= b2 && a2 >= b1) || (a2 >= b1 && a1 <= b2)) {
			count++;
		}
	})
	.on('end', () => {
		console.log(count);
	});
