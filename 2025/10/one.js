import split from "split";

let totalPushes = 0;

function correct(state, lights) {
  for (let i = 0; i < state.length; i++) {
    if (state[i] !== lights[i]) return false;
  }
  return true;
}

process.stdin
  .pipe(split())
  .on("data", (machine) => {
    const parts = machine.split(" ");
    const lights = parts
      .shift()
      .slice(1, -1)
      .split("")
      .map((c) => c === "#");
    const buttons = parts.map((p) => p.slice(1, -1).split(",").map(Number));

    let minPushes = Infinity;

    for (let mask = 1; mask < Math.pow(2, buttons.length); mask++) {
      let state = Array.from(Array(lights.length), () => false);
      let pushes = 0;

      for (let i = 0; i < buttons.length; i++) {
        if (mask & (1 << i)) {
          pushes++;
          for (const light of buttons[i]) {
            state[light] = !state[light];
          }
        }
      }

      if (pushes < minPushes && correct(state, lights)) {
        minPushes = pushes;
      }
    }

    totalPushes += minPushes;
  })
  .on("end", () => {
    console.log(totalPushes);
  });
