import split from "split";

const rack = {};

process.stdin
  .pipe(split())
  .on("data", (line) => {
    const [device, output] = line.split(": ");
    const outputs = output.split(" ");

    rack[device] = outputs;
  })
  .on("end", () => {
    console.log(
      findPaths("svr", "fft") *
        findPaths("fft", "dac") *
        findPaths("dac", "out"),
    );
  });

function findPaths(from, to) {
  const cache = {};

  function find(from) {
    if (from in cache) return cache[from];

    const outputs = rack[from];
    let paths = 0;

    if (outputs)
      for (const device of outputs) {
        if (device === to) {
          paths++;
        } else {
          paths += find(device);
        }
      }

    return (cache[from] = paths);
  }

  return find(from);
}
