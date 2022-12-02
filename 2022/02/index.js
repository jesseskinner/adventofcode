import split from 'split';

const points = {
	X: 1, // rock A
	Y: 2, // paper B
	Z: 3, // scissors C
};

const WIN = 6;
const DRAW = 3;

let score = 0;

process.stdin
	.pipe(split())
	.on('data', (line) => {
		const [them, me] = line.split(' ');

		if (!them) {
			return;
		}

		score += points[me];

		if (them === 'A') {
			if (me === 'X') {
				score += DRAW;
			} else if (me === 'Y') {
				score += WIN;
			}
		}

		if (them === 'B') {
			if (me === 'Y') {
				score += DRAW;
			} else if (me === 'Z') {
				score += WIN;
			}
		}

		if (them === 'C') {
			if (me === 'Z') {
				score += DRAW;
			} else if (me === 'X') {
				score += WIN;
			}
		}
	})
	.on('end', () => {
		console.log(score);
	});
