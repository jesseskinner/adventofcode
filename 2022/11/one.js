import split from 'split';

const rMonkey = /^Monkey (\d+):$/;
const rStarting = /^  Starting items: (.+)$/;
const rOperation = /^  Operation: new = old ([*+]) (.+)$/;
const rDivisible = /^  Test: divisible by (\d+)$/;
const rTrue = /^    If true: throw to monkey (\d+)$/;
const rFalse = /^    If false: throw to monkey (\d+)$/;

const monkeys = [];

process.stdin
	.pipe(split())
	.on('data', (line) => {
		if (rMonkey.test(line)) {
			monkeys.push({});
		} else if (rStarting.test(line)) {
			const match = rStarting.exec(line);
			monkeys[monkeys.length - 1].items = match[1].split(', ').map((x) => +x);
		} else if (rOperation.test(line)) {
			const match = rOperation.exec(line);
			monkeys[monkeys.length - 1].operation = createOperation(match[1], match[2]);
		} else if (rDivisible.test(line)) {
			const match = rDivisible.exec(line);
			monkeys[monkeys.length - 1].divisible = +match[1];
		} else if (rTrue.test(line)) {
			const match = rTrue.exec(line);
			monkeys[monkeys.length - 1].true = +match[1];
		} else if (rFalse.test(line)) {
			const match = rFalse.exec(line);
			monkeys[monkeys.length - 1].false = +match[1];
		}
	})
	.on('end', () => {
		let numInspections = monkeys.map(() => 0);

		for (let round = 1; round <= 20; round++) {
			for (let m = 0; m < monkeys.length; m++) {
				const monkey = monkeys[m];

				while (monkey.items.length) {
					let item = Math.floor(monkey.operation(monkey.items.shift()) / 3);

					if (item % monkey.divisible === 0) {
						monkeys[monkey.true].items.push(item);
					} else {
						monkeys[monkey.false].items.push(item);
					}

					numInspections[m]++;
				}
			}
		}

		// console.log(monkeys.map((m) => m.items));

		numInspections.sort((a, b) => b - a);
		console.log(numInspections[0] * numInspections[1]);
	});

function createOperation(operator, value) {
	const operatorFunction = operator === '*' ? (a, b) => a * b : (a, b) => a + b;

	if (value === 'old') {
		return (a) => operatorFunction(a, a);
	} else {
		return (a) => operatorFunction(a, +value);
	}
}
