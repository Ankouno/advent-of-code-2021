const fs = require('fs');

const positions = fs.readFileSync('inputs/day7.txt').toString().split(',')
  .map(Number).sort((a, b) => a - b);

const firstSolution = () => {
  let min = Infinity;
  for (let i = positions[0]; i < positions[positions.length-1]; i++) {
    let fuel = positions.reduce((a, c) => a + Math.abs(c-i), 0);
    if (fuel < min)
      min = fuel;
  }
  return min;
}

const secondSolution = () => {
  let min = Infinity;
  for (let i = positions[0]; i < positions[positions.length-1]; i++) {
    let fuel = positions.reduce((a, c) => a + (Math.abs(c-i) * (Math.abs(c-i)+1)/2), 0);
    if (fuel < min)
      min = fuel;
  }
  return min;
}

console.log("==[Day 7]=========")
console.log("1) " + firstSolution());
console.log("2) " + secondSolution());