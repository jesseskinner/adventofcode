import split from "split";

const red = [];
let biggest = 0;

process.stdin
  .pipe(split())
  .on("data", (line) => {
    const [x, y] = line.split(",").map(Number);

    for (const r of red) {
      const area = (Math.abs(x - r.x) + 1) * (Math.abs(y - r.y) + 1);
      if (area > biggest) biggest = area;
    }

    red.push({ x, y });
  })
  .on("end", () => {
    console.log(biggest);
  });
