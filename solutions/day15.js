const fs = require('fs');
const { round } = require('lodash');

const initMap = fs.readFileSync('inputs/day15.txt').toString().split('\n')
  .map(y => y.split('').map(Number));
  
const height = (map) => map.length;
const width = (map) => map[0].length;

const coordsToIndex = ({x, y}, map) => x + y * height(map);
const indexToCoords = (index, map) => {return {x: index % height(map), y: Math.floor(index / height(map))}};

const getNeighbors = (index, map) => {
  const {x, y} = indexToCoords(index, map);
  return [
    {x: x-1, y},
    {x: x+1, y},
    {x, y: y-1},
    {x, y: y+1}
  ].filter(({x, y}) => x >= 0 && y >= 0 && x < width(map) && y < height(map));
}

/** Implementation of Dijstra's algorithm based on the wikipedia example */
const solve = (map) => {
  const target = {x: width(map) - 1, y: height(map) - 1};
  const targetIndex = coordsToIndex(target, map);

  const size = height(map) * width(map);
  const dist = Array(size).fill(Infinity);
  const Q = new Set(Array(size).fill(0).map((_, i) => i));

  dist[0] = 0;
  while (Q.size > 0) {
    let min = Infinity;
    let minIndex = 0;
    for (const value of Q) {
      if (dist[value] < min) {
        min = dist[value];
        minIndex = value;
      }
    }

    const u = minIndex;
    Q.delete(minIndex);
    if (u == targetIndex) {
      break;
    }

    const neighbors = getNeighbors(u, map);
    for (const neighbor of neighbors) {
      const index = coordsToIndex(neighbor, map);
      const altDist = dist[u] + map[neighbor.y][neighbor.x];
      if (altDist < dist[index]) {
        dist[index] = altDist;
      }
    }
  }

  return dist[targetIndex];
}

const scaleMap = (map) =>
  Array(5 * height(map))
    .fill(0)
    .map((_, y) =>
      Array(5 * width(map))
        .fill(0)
        .map((_, x) => {
          const origX = x % width(map);
          const origY = y % height(map);
          const offset = Math.floor(x / width(map)) + Math.floor(y / height(map));
          const val = map[origY][origX] + offset;
          return val > 9 ? val - 9 : val;
        }))

// part 2 is very slow but i am too lazy to work out a faster solution
const firstSolution = () => solve(initMap);
const secondSolution = () => solve(scaleMap(initMap));

console.log("==[Day 15]=========")
console.log("1) " + firstSolution());
console.log("2) " + secondSolution());