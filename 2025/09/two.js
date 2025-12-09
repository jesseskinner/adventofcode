import split from "split";

const red = [];
const rectangles = [];

process.stdin
  .pipe(split())
  .on("data", (line) => {
    const [x, y] = line.split(",").map(Number);
    const j = red.length;

    for (let i = 0; i < red.length; i++) {
      const r = red[i];
      const area = (Math.abs(x - r.x) + 1) * (Math.abs(y - r.y) + 1);
      rectangles.push({ i, j, area });
    }

    red.push({ x, y });
  })
  .on("end", () => {
    rectangles.sort((a, b) => b.area - a.area);
    const edges = red.map(({ x, y }, i) => {
      const next = red[i + 1] ?? red[0];
      return {
        x1: Math.min(x, next.x),
        y1: Math.min(y, next.y),
        x2: Math.max(x, next.x),
        y2: Math.max(y, next.y),
      };
    });
    const h = edges.filter((e) => e.y1 === e.y2);
    const v = edges.filter((e) => e.x1 === e.x2);

    function odd(array) {
      return array.length % 2 !== 0;
    }

    function inside(x, y) {
      return (
        odd(h.filter(({ x1, x2, y1 }) => y1 <= y && x1 <= x && x2 >= x)) && // up
        odd(h.filter(({ x1, x2, y1 }) => y1 >= y && x1 <= x && x2 >= x)) && // down
        odd(v.filter(({ x1, y1, y2 }) => x1 <= x && y1 <= y && y2 >= y)) && // left
        odd(v.filter(({ x1, y1, y2 }) => x1 >= x && y1 <= y && y2 >= y)) // right
      );
    }

    for (const { i, j, area } of rectangles) {
      const a = red[i];
      const b = red[j];

      const left = Math.min(a.x, b.x) + 1;
      const right = Math.max(a.x, b.x) - 1;
      const top = Math.min(a.y, b.y) + 1;
      const bottom = Math.max(a.y, b.y) - 1;

      if (
        inside(left, top) &&
        inside(left, bottom) &&
        inside(right, top) &&
        inside(right, bottom) &&
        !h.some(
          ({ x1, x2, y1 }) =>
            x1 < right && x2 > left && y1 >= top && y1 <= bottom
        ) &&
        !v.some(
          ({ x1, y1, y2 }) =>
            x1 >= left && x1 <= right && y1 < bottom && y2 > top
        )
      ) {
        console.log(area);
        return;
      }
    }
  });
