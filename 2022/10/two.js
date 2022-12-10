import split from 'split';

let X = 1;
let cycle = 1;

const history = [];

process.stdin
	.pipe(split())
	.on('data', (line) => {
		if (!line) return;

		const parts = line.split(' ');
		const instruction = parts[0];

		if (instruction === 'noop') {
			tick();
		} else if (instruction === 'addx') {
			tick();
			tick();
			X += +parts[1];
		}
	})
	.on('end', () => {
		const pixels = history.map((X, i) => {
			const x = (i - 1) % 40;
			return Math.abs(X - x) < 2 ? '#' : '.';
		});

		console.log(pixels.slice(0, 41).join(''));
		console.log(pixels.slice(41, 81).join(''));
		console.log(pixels.slice(81, 121).join(''));
		console.log(pixels.slice(121, 161).join(''));
		console.log(pixels.slice(161, 201).join(''));
		console.log(pixels.slice(201).join(''));
	});

function tick() {
	history[cycle++] = X;
}
