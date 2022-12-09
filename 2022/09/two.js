import split from 'split';

const positions = new Set();
const rope = Array.from(Array(10), () => [0, 0]);

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
			rope[0][0] += dx;
			rope[0][1] += dy;

			for (let j = 1; j < rope.length; j++) {
				rope[j] = moveKnot(rope[j][0], rope[j][1], rope[j - 1][0], rope[j - 1][1]);
			}

			// draw(rope);

			positions.add(rope[rope.length - 1].join('x'));
		}
	})
	.on('end', () => {
		console.log(positions.size);
	});

function moveKnot(tx, ty, hx, hy) {
	const dx = (hx - tx) / Math.abs(hx - tx);
	const dy = (hy - ty) / Math.abs(hy - ty);

	if (Math.abs(hx - tx) === 2) {
		if (hy !== ty) {
			ty += dy;
		}
		tx += dx;
	} else if (Math.abs(hy - ty) === 2) {
		if (hx !== tx) {
			tx += dx;
		}
		ty += dy;
	}

	return [tx, ty];
}

function draw(rope) {
	const min = rope.reduce(
		(min, [x, y]) => {
			return [Math.min(min[0], x), Math.min(min[1], y)];
		},
		[0, 0]
	);

	const max = rope.reduce(
		(max, [x, y]) => {
			return [Math.max(max[0], x), Math.max(max[1], y)];
		},
		[0, 0]
	);

	const width = max[0] - min[0] + 1;
	const height = max[1] - min[1] + 1;

	const grid = Array.from(Array(height), () => Array.from(Array(width), () => '.'));

	for (let i = rope.length - 1; i >= 0; i--) {
		const [x, y] = rope[i];
		grid[y - min[1]][x - min[0]] = i;
	}

	console.log(
		grid
			.reverse()
			.map((row) => row.join(''))
			.join('\n') + '\n'
	);
}
