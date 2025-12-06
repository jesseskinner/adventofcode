import split from "split";

const lines = [];

process.stdin
  .pipe(split())
  .on("data", (line) => {
    lines.push(line.trim().split(/\s+/));
  })
  .on("end", () => {
    let total = 0;

    for (let column = 0; column < lines[0].length; column++) {
      const numbers = lines.map((line) => line[column]);
      const operation = numbers.pop();

      let result = +numbers[0];

      for (let row = 1; row < numbers.length; row++) {
        let number = +numbers[row];

        if (operation === "*") {
          result *= number;
        } else {
          result += number;
        }
      }

      total += result;
    }

    console.log(total);
  });
