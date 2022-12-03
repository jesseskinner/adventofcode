import { createReadStream } from 'fs';
import split from 'split';

//const lines = readFileSync('./input.txt', 'utf8').split("\n");

let max = 0;
let current = 0;

process.stdin
	.pipe(split())
	.on('data', (line) => {
		if (line === '') {
			current = 0;
		} else {
			current += +line;
		}
		max = Math.max(max, current);
	})
	.on('end', () => {
		console.log(max);
	});
