let recent = [];
let count = 0;

const size = 14;

process.stdin.on('data', (chunk) => {
	for (let char of chunk) {
		count++;

		if (recent.length === size) {
			recent.shift();
		}

		recent.push(String.fromCharCode(char));

		if (new Set(recent).size === size) {
			console.log(count);
			process.exit();
		}
	}
});
