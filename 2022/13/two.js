import split from 'split';

const items = [[[2]], [[6]]];

process.stdin
	.pipe(split())
	.on('data', (line) => {
		if (!line) return;

		items.push(JSON.parse(line));
	})
	.on('end', () => {
		items.sort((a, b) => (isRightOrder(a, b) ? -1 : 1));

		const i1 = 1 + items.findIndex((x) => JSON.stringify(x) === '[[2]]');
		const i2 = 1 + items.findIndex((x) => JSON.stringify(x) === '[[6]]');

		console.log(i1 * i2);
	});

function isRightOrder(left, right) {
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
