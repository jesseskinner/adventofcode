import split from 'split';

const elves = [];
let elf = 0;

process.stdin
	.pipe(split())
	.on('data', (line) => {
		if (line === '') {
			elves.push(elf);
			elf = 0;
		} else {
			elf += +line;
		}
	})
	.on('end', () => {
		elves.push(elf);
		elves.sort((a, b) => b - a);

		const top3 = elves.slice(0, 3);
		console.log(top3.reduce((a, b) => a + b, 0));
	});
