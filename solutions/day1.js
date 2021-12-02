const fs = require('fs');

const depths = fs.readFileSync('inputs/day1.txt').toString().split('\n').map(Number);

const firstSolution = () => {
  let count = 0;
  for (let i = 1; i < depths.length; i++) {
    if (depths[i] > depths[i-1]) { count++; }
  }
  return count;
}

const secondSolution = () => {
  let count = 0;
  let prevSum = depths[0] + depths[1] + depths[2];
  for (let i = 3; i < depths.length; i++) {
    const currSum = depths[i] + depths[i-1] + depths[i-2]
    if (currSum > prevSum) { count++; }
    prevSum = currSum;
  }
  return count;
}

console.log("==[Day 1]=========")
console.log("1) " + firstSolution());
console.log("2) " + secondSolution());