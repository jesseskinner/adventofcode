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
    const paths = findPaths("you", "out");
    console.log(paths.length);
  });

function findPaths(from, to) {
  const outputs = rack[from];
  const paths = [];

  for (const device of outputs) {
    if (device === to) {
      paths.push(device);
    } else {
      for (const path of findPaths(device, to)) {
        paths.push(`${device} ${path}`);
      }
    }
  }

  return paths;
}
