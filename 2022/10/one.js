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
		// console.log(20, strength(20), history[20]);
		// console.log(60, strength(60), history[60]);
		// console.log(100, strength(100), history[100]);
		// console.log(140, strength(140), history[140]);
		// console.log(180, strength(180), history[180]);
		// console.log(220, strength(220), history[220]);
		console.log(strength(20) + strength(60) + strength(100) + strength(140) + strength(180) + strength(220));
	});

function tick() {
	history[cycle++] = X;
}

function strength(index) {
	return index * history[index];
}
