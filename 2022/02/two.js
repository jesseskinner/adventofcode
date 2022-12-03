import split from 'split';

const points = {
	A: 1, // rock A
	B: 2, // paper B
	C: 3, // scissors C
};

const WIN = 6;
const DRAW = 3;

let score = 0;

process.stdin
	.pipe(split())
	.on('data', (line) => {
		const [them, goal] = line.split(' ');

		if (!them) {
			return;
		}

		let me;

		if (goal === 'X') {
			// lose
			if (them === 'A') {
				me = 'C';
			} else if (them === 'B') {
				me = 'A';
			} else {
				me = 'B';
			}
		} else if (goal === 'Y') {
			// draw
			me = them;
			score += DRAW;
		} else if (goal === 'Z') {
			// win
			if (them === 'A') {
				me = 'B';
			} else if (them === 'B') {
				me = 'C';
			} else {
				me = 'A';
			}
			score += WIN;
		}

		score += points[me];
	})
	.on('end', () => {
		console.log(score);
	});
