import split from 'split';

let map = [];

process.stdin
	.pipe(split())
	.on('data', (line) => {
		if (line) {
			map.push(line.split('').map(Number));
		}
	})
	.on('end', () => {
		const width = map[0].length;
		const height = map.length;

		let max = -1;

		for (let x = 0; x < width; x++) {
			for (let y = 0; y < height; y++) {
				const score = getScenicScore(x, y);

				if (score > max) {
					max = score;
				}
			}
		}

		console.log(max);
	});

function getScenicScore(x, y) {
	const up = getScenicScoreDirection(x, y, 0, -1);
	const down = getScenicScoreDirection(x, y, 0, 1);
	const left = getScenicScoreDirection(x, y, -1, 0);
	const right = getScenicScoreDirection(x, y, 1, 0);
	return up * down * left * right;
}

function getScenicScoreDirection(x1, y1, dx, dy) {
	const width = map[0].length;
	const height = map.length;

	let count = 0;
	let start = map[y1][x1];

	for (let x = x1 + dx, y = y1 + dy; x >= 0 && x < width && y >= 0 && y < height; dx ? (x += dx) : (y += dy)) {
		const tree = map[y][x];

		if (tree >= start) {
			count++;
			break;
		} else {
			count++;
		}
	}

	return count;
}
