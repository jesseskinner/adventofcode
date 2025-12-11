import split from "split";
import solver from "javascript-lp-solver";

let totalPushes = 0;

process.stdin
  .pipe(split())
  .on("data", (machine) => {
    const parts = machine.split(" ");
    const buttons = parts
      .slice(1, -1)
      .map((p) => p.slice(1, -1).split(",").map(Number));
    const joltage = parts.at(-1).slice(1, -1).split(",").map(Number);

    const model = {
      optimize: "presses",
      opType: "min",
      constraints: Object.fromEntries(
        joltage.map((j, i) => [`j${i}`, { equal: j }])
      ),
      variables: Object.fromEntries(
        buttons.map((button, i) => [
          `b${i}`,
          {
            presses: 1,
            ...Object.fromEntries(button.map((b) => [`j${b}`, 1])),
          },
        ])
      ),
      ints: Object.fromEntries(buttons.map((_, i) => [`b${i}`, 1])),
    };

    const { result } = solver.Solve(model);
    totalPushes += result;
  })
  .on("end", () => {
    console.log(totalPushes);
  });
