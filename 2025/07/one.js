import split from "split";

const lines = [];

process.stdin
  .pipe(split())
  .on("data", (line) => {
    lines.push(line.split(""));
  })
  .on("end", () => {
    let tachyons = new Set();
    tachyons.add(lines[0].indexOf("S"));

    let splitCount = 0;

    for (let i = 1; i < lines.length; i++) {
      for (const t of [...tachyons]) {
        if (lines[i][t] === "^") {
          splitCount++;
          tachyons.delete(t);
          tachyons.add(t - 1);
          tachyons.add(t + 1);
        }
      }
    }

    console.log(splitCount);
  });
