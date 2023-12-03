import split from 'split';

const lines = [];
const gears = {};

process.stdin
	.pipe(split())
	.on('data', (line) => {
		if (line) lines.push(line);
	})
	.on('end', () => {
		let sum = 0;

		for (let i = 0; i < lines.length; i++) {
			const line = '' + lines[i];

			for (const m of line.matchAll(/[0-9]+/g)) {
				const number = +m[0];
				const numLength = m[0].length;

				const start = Math.max(0, m.index - 1);
				const end = Math.min(line.length, m.index + numLength + 1);

				const gearA = lines[i - 1]?.slice(start, end).indexOf('*') ?? -1;
				const gearB = lines[i]?.slice(start, end).indexOf('*') ?? -1;
				const gearC = lines[i + 1]?.slice(start, end).indexOf('*') ?? -1;

				if (gearA > -1) addGearNumber(i - 1, start + gearA, number);
				if (gearB > -1) addGearNumber(i, start + gearB, number);
				if (gearC > -1) addGearNumber(i + 1, start + gearC, number);
			}
		}

		for (const gear of Object.values(gears)) {
			if (gear.length === 2) {
				sum += gear[0] * gear[1];
			}
		}

		console.log(sum);
	});

function addGearNumber(row, column, number) {
	const key = `${row},${column}`;
	gears[key] = gears[key] || [];
	gears[key].push(number);
}
