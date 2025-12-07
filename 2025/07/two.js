import split from "split";

const lines = [];

process.stdin
  .pipe(split())
  .on("data", (line) => {
    lines.push(line.split(""));
  })
  .on("end", () => {
    const start = lines[0].indexOf("S");
    let tachyons = new Map();
    tachyons.set(start, 1);

    for (let i = 1; i < lines.length; i++) {
      const next = new Map();

      for (const [t, timelines] of tachyons.entries()) {
        if (lines[i][t] === "^") {
          if (next.has(t - 1)) {
            next.set(t - 1, next.get(t - 1) + timelines);
          } else {
            next.set(t - 1, timelines);
          }

          if (next.has(t + 1)) {
            next.set(t + 1, next.get(t + 1) + timelines);
          } else {
            next.set(t + 1, timelines);
          }
        } else if (next.has(t)) {
          next.set(t, next.get(t) + timelines);
        } else {
          next.set(t, timelines);
        }
      }
      tachyons = next;
    }

    console.log(tachyons.values().reduce((p, c) => p + c, 0));
  });
