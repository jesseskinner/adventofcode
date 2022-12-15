import split from 'split';

const rLine = /^Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)$/;

// const max = 20;
const max = 4000000;
const signals = [];

process.stdin
	.pipe(split())
	.on('data', (line) => {
		if (!line) return;

		let m = rLine.exec(line);

		const sx = +m[1];
		const sy = +m[2];
		const bx = +m[3];
		const by = +m[4];

		const d = Math.abs(sx - bx) + Math.abs(sy - by);

		signals.push([sx, sy, bx, by, d]);
	})
	.on('end', () => {
		for (const [sx, sy, bx, by, d] of signals) {
			for (let y = Math.max(0, sy - d + 1); y <= Math.min(max, sy + d); y++) {
				const x1 = sx - d + Math.abs(y - sy) - 1;
				const x2 = sx + d - Math.abs(y - sy) + 1;

				if (x1 >= 0 && x1 <= max && !withinAnySignal(x1, y)) {
					console.log(x1, y, x1 * max + y);
					return;
				}
				if (x2 >= 0 && x2 <= max && !withinAnySignal(x2, y)) {
					console.log(x2, y, x2 * max + y);
					return;
				}
			}
		}
	});

function withinAnySignal(x, y) {
	for (const [sx, sy, bx, by, d] of signals) {
		if ((bx === bx && by === y) || (sx === x && sy === y)) return true;
		if (Math.abs(x - sx) + Math.abs(y - sy) <= d) return true;
	}
	return false;
}
