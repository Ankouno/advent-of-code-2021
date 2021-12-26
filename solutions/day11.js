const fs = require('fs');

const initMap = fs.readFileSync('inputs/day11.txt').toString().split('\n')
  .map(y => y.split('').map(Number));
const h = initMap.length;
const w = initMap[0].length;

let flashCounter = 0;
let flashedList = [];

const flashOctopus = (map, x, y) => {
  flashCounter += 1;

  if (y > 0)   { incrOctopus(map, x, y-1); }
  if (y < h-1) { incrOctopus(map, x, y+1); }

  if (x > 0) {
    incrOctopus(map, x-1, y);
    if (y > 0)   { incrOctopus(map, x-1, y-1); }
    if (y < h-1) { incrOctopus(map, x-1, y+1); }
  }

  if (x < w-1) {
    incrOctopus(map, x+1, y);
    if (y > 0)   { incrOctopus(map, x+1, y-1); }
    if (y < h-1) { incrOctopus(map, x+1, y+1); }
  }
}

const incrOctopus = (map, x, y) => {
  if (flashedList.includes(x + ',' + y)) return;

  let energy = map[y][x];
  if (energy == 9) {
    map[y][x] = 0;
    flashedList.push(x + ',' + y)
    flashOctopus(map, x, y);
  } else {
    map[y][x] = energy + 1;
  }
}

const stepMap = (map) => {
  flashedList = [];
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      incrOctopus(map, x, y);
    }
  }
}

const firstSolution = () => {
  const map = initMap.map(y => [...y]);
  flashCounter = 0;
  for (let i = 0; i < 100; i++) {
    stepMap(map);
  }
  return flashCounter;
}

const secondSolution = () => {
  const map = initMap.map(y => [...y]);
  let steps = 0;
  while (flashedList.length != h * w) {
    steps += 1;
    stepMap(map);
  }
  return steps;
}

console.log("==[Day 11]=========")
console.log("1) " + firstSolution());
console.log("2) " + secondSolution());