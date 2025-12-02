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

  return (
    num.length % 2 === 0 &&
    num.slice(0, num.length / 2) === num.slice(num.length / 2)
  );
}
