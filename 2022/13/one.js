import split from 'split';

const pairs = [];

let left;

process.stdin
	.pipe(split())
	.on('data', (line) => {
		if (!line) return;

		line = JSON.parse(line);

		if (left) {
			pairs.push([left, line]);
			left = null;
		} else {
			left = line;
		}
	})
	.on('end', () => {
		let rightOrderIndices = [];

		for (let i = 0; i < pairs.length; i++) {
			const [left, right] = pairs[i];

			if (isRightOrder(left, right)) {
				console.log('yes');
				rightOrderIndices.push(i + 1);
			} else {
				console.log('no');
			}
		}

		console.log(rightOrderIndices);

		console.log(rightOrderIndices.reduce((a, b) => a + b, 0));
	});

function isRightOrder(left, right) {
	console.log('Compare', left, 'vs', right);
	if (left === undefined) {
		return true;
	}

	if (right === undefined) {
		return false;
	}

	if (typeof left === 'number' && typeof right === 'number') {
		if (left === right) {
			return;
		}
		return left < right;
	}

	if (typeof left === 'number') {
		left = [left];
	}

	if (typeof right === 'number') {
		right = [right];
	}

	for (let i = 0; i < Math.max(left.length, right.length); i++) {
		const r = isRightOrder(left[i], right[i]);
		if (r !== undefined) {
			return r;
		}
	}

	return;
}
