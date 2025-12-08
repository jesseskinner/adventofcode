import split from "split";

const boxes = [];

process.stdin
  .pipe(split())
  .on("data", (line) => {
    const [x, y, z] = line.split(",").map(Number);
    boxes.push({ x, y, z, circuit: boxes.length + 1 });
  })
  .on("end", () => {
    const distances = [];

    for (let i = 0; i < boxes.length; i++) {
      for (let j = i + 1; j < boxes.length; j++) {
        distances.push({ i, j, d: distance(boxes[i], boxes[j]) });
      }
    }

    distances.sort((a, b) => a.d - b.d);

    for (const { i, j } of distances) {
      const a = boxes[i];
      const b = boxes[j];

      if (a.circuit !== b.circuit) {
        const bCircuit = b.circuit;
        let connectedCount = 0;
        for (const box of boxes) {
          if (box.circuit === bCircuit) {
            box.circuit = a.circuit;
          }

          if (box.circuit === a.circuit) {
            connectedCount++;
          }
        }

        if (connectedCount === boxes.length) {
          console.log(a.x * b.x);
          return;
        }
      }
    }
  });

function distance(a, b) {
  return (
    Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2) + Math.pow(a.z - b.z, 2)
  );
}
