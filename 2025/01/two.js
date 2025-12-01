import split from "split";

let zeroCount = 0;
let position = 50;

process.stdin
  .pipe(split())
  .on("data", (line) => {
    if (line) {
      const direction = line[0];
      const count = +line.slice(1);

      for (let i = 0; i < count; i++) {
        position = position + (direction === "L" ? -1 : 1);

        if (position === 100) {
          position = 0;
        } else if (position === -1) {
          position = 99;
        }
        if (position === 0) {
          zeroCount++;
        }
      }
    }
  })
  .on("end", () => {
    console.log(zeroCount);
  });
