import split from "split";

const ranges = [];
let freshCount = 0;

process.stdin
  .pipe(split())
  .on("data", (line) => {
    if (line.includes("-")) {
      ranges.push(line.split("-").map(Number));
    } else if (line) {
      line = +line;
      if (ranges.some(([from, to]) => from <= line && to >= line)) {
        freshCount++;
      }
    }
  })
  .on("end", () => {
    console.log(freshCount);
  });
