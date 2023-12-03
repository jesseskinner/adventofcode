import split from 'split';

const textNumbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
let sum = 0;

process.stdin
	.pipe(split())
	.on('data', (line) => {
		if (line) {
			let first;
			let last;
			let indexFirst = Infinity;
			let indexLast = -Infinity;

			for (let i = 0; i < line.length; i++) {
				if (/\d/.test(line[i])) {
					if (indexFirst > i) {
						indexFirst = i;
						first = +line[i];
					}
					if (indexLast < i) {
						indexLast = i;
						last = +line[i];
					}
				}

				for (const t of textNumbers) {
					if (line.substr(i, t.length) === t) {
						if (indexFirst > i) {
							indexFirst = i;
							first = textNumbers.indexOf(t) + 1;
						}
						if (indexLast < i + t.length - 1) {
							indexLast = i + t.length - 1;
							last = textNumbers.indexOf(t) + 1;
						}
					}
				}
			}

			const calibrationValue = +`${first}${last}`;
			sum += calibrationValue;
		}
	})
	.on('end', () => {
		console.log(sum);
	});
