import split from "split";

let joltage = 0;

process.stdin
  .pipe(split())
  .on("data", (bank) => {
    joltage += Number(getMaxJoltage(bank, 12));
  })
  .on("end", () => {
    console.log(joltage);
  });

function getMaxJoltage(bank, numDigits) {
  for (let digit = 9; digit >= 0; digit--) {
    let index = bank.indexOf(digit);

    if (index > -1) {
      if (numDigits === 1) {
        return digit;
      }

      let subMax = getMaxJoltage(bank.slice(index + 1), numDigits - 1);
      if (subMax) {
        return `${digit}${subMax}`;
      }
    }
  }
}
