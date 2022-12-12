import split from 'split';

const squares = [];

process.stdin
	.pipe(split())
	.on('data', (line) => {
		if (!line) return;

		const row = [];

		for (let i = 0; i < line.length; i++) {
			const char = line[i];
			const level = char === 'S' ? 'a' : char === 'E' ? 'z' : char;

			row.push({
				row: squares.length,
				col: i,
				start: line[i] === 'S',
				end: line[i] === 'E',
				level: level.charCodeAt(0) - 97,
				up: null,
				left: null,
				right: null,
				down: null,
			});
		}

		squares.push(row);
	})
	.on('end', () => {
		let start = [];
		let end = null;

		for (let y = 0; y < squares.length; y++) {
			for (let x = 0; x < squares[0].length; x++) {
				const s = squares[y][x];

				if (s.level === 0) {
					start.push(s);
					continue;
				}

				if (s.end) {
					end = s;
				}

				s.up = y === 0 ? null : squares[y - 1][x];
				s.left = x === 0 ? null : squares[y][x - 1];
				s.right = x === squares[0].length - 1 ? null : squares[y][x + 1];
				s.down = y === squares.length - 1 ? null : squares[y + 1][x];

				const min = s.level - 1;

				if (s.up && s.up.level < min) {
					s.up = null;
				}

				if (s.left && s.left.level < min) {
					s.left = null;
				}

				if (s.right && s.right.level < min) {
					s.right = null;
				}

				if (s.down && s.down.level < min) {
					s.down = null;
				}
			}
		}

		set(end, 0);

		console.log(start.filter((s) => s.steps).reduce((min, s) => Math.min(min, s.steps), Infinity));
	});

function set(s, steps) {
	if (!s) return;

	if (!('steps' in s) || s.steps > steps) {
		s.steps = steps;

		set(s.up, steps + 1);
		set(s.down, steps + 1);
		set(s.left, steps + 1);
		set(s.right, steps + 1);
	}
}
