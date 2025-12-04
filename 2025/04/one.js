import split from "split";

const grid = [];

process.stdin
  .pipe(split())
  .on("data", (row) => {
    grid.push(row);
  })
  .on("end", () => {
    let debug = "";
    let accessible = 0;
    let width = grid[0].length;
    let height = grid.length;

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (grid[i][j] === "@") {
          let adjacent = 0;
          for (
            let y = Math.max(0, i - 1);
            y <= Math.min(height - 1, i + 1);
            y++
          ) {
            for (
              let x = Math.max(0, j - 1);
              x <= Math.min(width - 1, j + 1);
              x++
            ) {
              // skip the middle
              if (y === i && x === j) continue;
              if (grid[y][x] === "@") adjacent++;
            }
          }
          if (adjacent < 4) accessible++;
        }
      }
    }

    console.log(accessible);
  });
