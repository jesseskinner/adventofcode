import split from 'split';

const map = { '500x0': '+' };

let minX = Infinity;
let maxX = 500;

let minY = 0;
let maxY = -Infinity;

process.stdin
	.pipe(split())
	.on('data', (line) => {
		if (!line) return;

		const coords = line.split(' -> ').map((x) => x.split(',').map((x) => +x));

		for (let i = 0; i < coords.length - 1; i++) {
			const from = coords[i];
			const to = coords[i + 1];

			minX = Math.min(minX, from[0], to[0]);
			maxX = Math.max(maxX, from[0], to[0]);
			minY = Math.min(minY, from[1], to[1]);
			maxY = Math.max(maxY, from[1], to[1]);

			const line = getLine(from, to);

			for (let j = 0; j < line.length; j++) {
				set(line[j], '#');
			}
		}
	})
	.on('end', () => {
		// draw();

		for (let i = 0; ; i++) {
			let x = 500;
			let y = 0;

			while (true) {
				if (!get(x, y + 1)) {
					y = y + 1;
				} else if (!get(x - 1, y + 1)) {
					x = x - 1;
					y = y + 1;
				} else if (!get(x + 1, y + 1)) {
					x = x + 1;
					y = y + 1;
				} else {
					if (y === 0) {
						// draw();
						console.log(i + 1);
						return;
					}

					set([x, y], 'o');
					break;
				}
			}
		}
	});

function set([x, y], v) {
	map[[x, y].join('x')] = v;
}

function get(x, y) {
	if (y === maxY + 2) {
		return '#';
	}

	return map[[x, y].join('x')];
}

function getLine([x1, y1], [x2, y2]) {
	const line = [];

	if (x1 === x2) {
		for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
			line.push([x1, y]);
		}
	} else if (y1 === y2) {
		for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
			line.push([x, y1]);
		}
	}
	return line;
}

function draw() {
	const width = maxX - minX + 1;
	const height = maxY - minY + 1;

	const grid = Array(height)
		.fill()
		.map(() => Array(width).fill(' '));

	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			grid[y][x] = map[[x + minX, y + minY].join('x')] || '.';
		}
	}

	console.log(grid.map((x) => x.join('')).join('\n'));
}
