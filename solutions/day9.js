const fs = require('fs');

const map = fs.readFileSync('inputs/day9.txt').toString().split('\n')
  .map(y => y.split('').map(Number));
const h = map.length;
const w = map[0].length;

const getLowPoints = () => {
  const points = [];
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const height = map[y][x];
      if (!((x > 0 && map[y][x-1] <= height) ||
            (y > 0 && map[y-1][x] <= height) ||
            (x < w-1 && map[y][x+1] <= height) ||
            (y < h-1 && map[y+1][x] <= height))) {
        points.push([x, y]);
      }
    }
  }
  return points;
}

const getBasinSize = ([x,y], traversed = []) => {
  const height = map[y][x];
  if (height == 9) { return 0; }

  if (traversed.includes(x + ',' + y)) { return 0; }
  traversed.push(x + ',' + y);

  let size = 1;
  if (x > 0 && map[y][x-1] >= height) { size += getBasinSize([x-1, y], traversed); }
  if (y > 0 && map[y-1][x] >= height) { size += getBasinSize([x, y-1], traversed); }
  if (x < w-1 && map[y][x+1] >= height) { size += getBasinSize([x+1, y], traversed); }
  if (y < h-1 && map[y+1][x] >= height) { size += getBasinSize([x, y+1], traversed); }
  return size;
}

const firstSolution = () => {
  return getLowPoints().reduce((a, [x,y]) => a + map[y][x] + 1, 0);
}

const secondSolution = () => {
  const basins = getLowPoints().map(p => getBasinSize(p));
  basins.sort((a, b) => b - a);
  return basins[0] * basins[1] * basins[2];
}

console.log("==[Day 9]=========")
console.log("1) " + firstSolution());
console.log("2) " + secondSolution());