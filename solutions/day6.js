const fs = require('fs');

const initTimers = fs.readFileSync('inputs/day6.txt').toString().split(',').map(Number);
const initFishCounts = new Array(9).fill(0);
initTimers.forEach(t => initFishCounts[t] += 1);

const simulateDays = (numDays) => {
  const fishCounts = [...initFishCounts];
  for (let t = 0; t < numDays; t++) {
    const spawnedFish = fishCounts.shift();
    fishCounts[6] += spawnedFish;
    fishCounts[8] = spawnedFish;
  }
  return fishCounts.reduce((a, c) => a + c, 0);
}

const firstSolution = () => {
  return simulateDays(80);
}

const secondSolution = () => {
  return simulateDays(256);
}

console.log("==[Day 6]=========")
console.log("1) " + firstSolution());
console.log("2) " + secondSolution());