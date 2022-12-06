let recent = [];
let count = 0;

process.stdin.on('data', (chunk) => {
	for (let char of chunk) {
		count++;

		if (recent.length === 4) {
			recent.shift();
		}

		recent.push(String.fromCharCode(char));

		if (new Set(recent).size === 4) {
			console.log(count);
			process.exit();
		}
	}
});
