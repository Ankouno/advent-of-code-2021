const fs = require('fs');

const inputRegex = /(\d+),(\d+) -> (\d+),(\d+)/;
const vents = fs.readFileSync('inputs/day5.txt').toString().split('\n')
  .map(x => x.match(inputRegex).splice(1).map(Number));

const addLine = (line, map, counter, hvOnly) => {
  let [x1, y1, x2, y2] = line;
  if (hvOnly && (x1 != x2 && y1 != y2)) { return; }

  if (y1 > y2) { [x1, x2, y1, y2] = [x2, x1, y2, y1]; }
  const xOff = Math.sign(x2 - x1);
  const yOff = Math.sign(y2 - y1);

  // two versions of the for loop are necessary for handling diagonals
  if (xOff != -1) {
    for (let x = x1, y = y1; x <= x2 && y <= y2; x += xOff, y += yOff) {
      if (!map[y]) { map[y] = Array(); }
      const current = map[y][x] || 0;
      if (current == 1) { counter[0] += 1; }
      map[y][x] = current + 1;
    }
  } else {
    for (let x = x1, y = y1; x >= x2 && y <= y2; x -= 1, y += yOff) {
      if (!map[y]) { map[y] = Array(); }
      const current = map[y][x] || 0;
      if (current == 1) { counter[0] += 1; }
      map[y][x] = current + 1;
    }
  }
}

const firstSolution = () => {
  const map = Array();
  const counter = [0];
  vents.forEach(v => addLine(v, map, counter, true));
  return counter[0];
}

const secondSolution = () => {
  const map = Array();
  const counter = [0];
  vents.forEach(v => addLine(v, map, counter, false));
  return counter[0];
}

console.log("==[Day 5]=========")
console.log("1) " + firstSolution());
console.log("2) " + secondSolution());