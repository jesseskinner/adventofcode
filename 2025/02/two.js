import split from "split";

let invalidSum = 0;

process.stdin.pipe(split()).on("data", (line) => {
  if (!line) return;

  for (let range of line.split(",")) {
    const [from, to] = range.split("-");
    for (let i = +from; i <= +to; i++) {
      if (invalid(i)) {
        invalidSum += i;
      }
    }
  }

  console.log(invalidSum);
});

function invalid(num) {
  num = String(num);

  for (let d = 2; d <= num.length; d++) {
    if (
      num.length % d === 0 &&
      Array.from(Array(d), () => num.slice(0, num.length / d)).join("") === num
    ) {
      return true;
    }
  }

  return false;
}
