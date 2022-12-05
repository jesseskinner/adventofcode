import split from 'split';

const rMove = /^move (\d+) from (\d+) to (\d+)$/;

let stacks;
let numStacks;

process.stdin
	.pipe(split())
	.on('data', (line) => {
		if (!line) return;

		if (line.includes('[')) {
			if (!stacks) {
				numStacks = Math.ceil(line.length / 4);
				stacks = [null].concat(Array.from(Array(numStacks), () => []));
			}

			for (let s = 1; s <= numStacks; s++) {
				const char = line[(s - 1) * 4 + 1];

				if (char !== ' ') {
					stacks[s].push(char);
				}
			}
		} else if (line.includes('move')) {
			const [_, count, from, to] = rMove.exec(line);
			const move = [];

			for (let i = 0; i < count; i++) {
				move.push(stacks[from].shift());
			}

			for (let i = 0; i < count; i++) {
				stacks[to].unshift(move.pop());
			}
		}
	})
	.on('end', () => {
		console.log(
			stacks
				.slice(1)
				.map((stack) => stack[0] || '')
				.join('')
		);
	});
