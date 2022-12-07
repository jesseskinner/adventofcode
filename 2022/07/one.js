import split from 'split';

let pwd = '/';

const sizes = {};

process.stdin
	.pipe(split())
	.on('data', (line) => {
		if (!line) return;

		if (line === '$ cd /') {
			pwd = '/';
		} else if (line === '$ cd ..') {
			pwd = pwd.slice(0, pwd.lastIndexOf('/', pwd.length - 2) + 1);
		} else if (line.startsWith('$ cd ')) {
			pwd += line.slice(5) + '/';
		} else if (line === '$ ls') {
			sizes[pwd] = 0;
		} else if (line.startsWith('dir ')) {
			// ignore
		} else {
			sizes[pwd] += parseInt(line.split(' ')[0]);
		}
	})
	.on('end', () => {
		const totals = {};

		for (const pwd in sizes) {
			totals[pwd] = 0;

			for (const pwd2 in sizes) {
				if (pwd2.startsWith(pwd)) {
					totals[pwd] += sizes[pwd2];
				}
			}
		}

		let sum = 0;

		for (const pwd in totals) {
			if (totals[pwd] <= 100000) {
				sum += totals[pwd];
			}
		}

		console.log(sum);
	});
