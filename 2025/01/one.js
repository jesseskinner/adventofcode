import split from "split";

let zeroCount = 0;
let position = 50;

process.stdin
  .pipe(split())
  .on("data", (line) => {
    if (line) {
      const direction = line[0];
      const count = +line.slice(1);

      position = (position + count * (direction === "L" ? -1 : 1)) % 100;
      if (position === 0) zeroCount++;
    }
  })
  .on("end", () => {
    console.log(zeroCount);
  });
