import split from "split";

const lines = [];

process.stdin
  .pipe(split())
  .on("data", (line) => {
    lines.push(line);
  })
  .on("end", () => {
    let total = 0;

    const operations = lines.pop();
    let operation;
    let result;

    for (let column = 0; column <= operations.length; column++) {
      if (operations[column] !== " ") {
        operation = operations[column];
      }

      const chars = lines
        .map((line) => line[column])
        .join("")
        .trim();

      if (chars.length) {
        const number = Number(chars);
        if (result === undefined) {
          result = number;
        } else if (operation === "*") {
          result *= number;
        } else {
          result += number;
        }
      } else {
        total += result;
        result = undefined;
      }
    }

    console.log(total);
  });
