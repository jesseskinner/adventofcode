import split from 'split';

let tx = 0;
let ty = 0;

let hx = 0;
let hy = 0;

let positions = new Set();

const move = {
	U: [0, 1],
	D: [0, -1],
	L: [-1, 0],
	R: [1, 0],
};

process.stdin
	.pipe(split())
	.on('data', (line) => {
		if (!line) return;

		const parts = line.split(' ');
		const direction = parts[0];
		const steps = +parts[1];
		const [dx, dy] = move[direction];

		for (let i = 0; i < steps; i++) {
			hx += dx;
			hy += dy;

			if (Math.abs(hx - tx) === 2) {
				if (hy !== ty) {
					ty = hy;
				}
				tx = Math.round((hx + tx) / 2);
			} else if (Math.abs(hy - ty) === 2) {
				if (hx !== tx) {
					tx = hx;
				}
				ty = Math.round((hy + ty) / 2);
			}

			positions.add([tx, ty].join('x'));
		}
	})
	.on('end', () => {
		console.log(positions.size);
	});
