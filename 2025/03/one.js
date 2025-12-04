import split from "split";

let joltage = 0;

process.stdin
  .pipe(split())
  .on("data", (bank) => {
    for (let a = 9; a > 0; a--) {
      let indexA = bank.indexOf(a);

      if (indexA > -1) {
        for (let b = 9; b > 0; b--) {
          let indexB = bank.indexOf(b, indexA + 1);

          if (indexB > -1) {
            joltage += Number(`${a}${b}`);
            return;
          }
        }
      }
    }
  })
  .on("end", () => {
    console.log(joltage);
  });
