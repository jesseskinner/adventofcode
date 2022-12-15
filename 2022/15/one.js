import split from 'split';

const rLine = /^Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)$/;

const y = 2000000;
const xs = new Set();

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

		const extra = Math.max(0, d - Math.abs(sy - y));

		if (extra > 0) {
			for (let x = sx - extra + 1; x <= sx + extra; x++) {
				xs.add(x);
			}
		}
	})
	.on('end', () => {
		console.log(xs.size);
	});
