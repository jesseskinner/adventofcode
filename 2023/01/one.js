import split from 'split';

let sum = 0;

process.stdin
	.pipe(split())
	.on('data', (line) => {
		if (line) {
			const numbers = line.replace(/[^0-9]/g, '');
			const calibrationValue = +`${numbers[0]}${numbers.at(-1)}`;
			sum += calibrationValue;
		}
	})
	.on('end', () => {
		console.log(sum);
	});
