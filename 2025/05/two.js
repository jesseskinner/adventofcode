import split from "split";

const ranges = [];

process.stdin
  .pipe(split())
  .on("data", (line) => {
    if (line.includes("-")) {
      const [start, stop] = line.split("-").map(Number);
      ranges.push({ start });
      ranges.push({ stop });
    }
  })
  .on("end", () => {
    ranges.sort((a, b) => (a.start ?? a.stop) - (b.start ?? b.stop));

    let freshCount = 0;
    let active = 0;
    let since;

    for (const { start, stop } of ranges) {
      if (start) {
        if (!active) {
          if (since === start) {
            since = start + 1;
          } else {
            since = start;
          }
        }
        active++;
      } else {
        if (!--active) {
          freshCount += stop - since + 1;
          since = stop;
        }
      }
    }

    console.log(freshCount);
  });
