import split from "split";

const shapes = [];
let shapeIndex;
let possibleCount = 0;

process.stdin
  .pipe(split())
  .on("data", (line) => {
    if (!line) return;

    if (/^\d+:/.test(line)) {
      shapeIndex = +line.slice(0, -1);
      shapes.push({ grid: [], blocks: 0 });
      return;
    }

    if (/^[#.]+$/.test(line)) {
      shapes[shapeIndex].grid.push(line);
      shapes[shapeIndex].blocks += line
        .split("")
        .filter((c) => c === "#").length;
      return;
    }

    let [dimensions, ...counts] = line.split(" ");
    counts = counts.map(Number);

    const [x, y] = dimensions.slice(0, -1).split("x").map(Number);
    const blocks = x * y;
    const needed = counts.reduce((t, c, i) => t + c * shapes[i].blocks, 0);

    if (blocks >= needed) {
      possibleCount++;
    }
  })
  .on("end", () => {
    console.log(possibleCount);
  });
