const fs = require('fs');

const nums = fs.readFileSync('inputs/day3.txt').toString()
  .split('\n').map(n => n.split("").map(Number));

/** Get the count of 1 bits at a specified position. */
const getBitCount = (numbers, pos) => {
  return numbers.reduce((c, n) => c + n[pos], 0);
}

const firstSolution = () => {
  const totalBits = nums[0].length;
  const bitCounts = Array(totalBits);
  for (let b = 0; b < totalBits; b++) {
    bitCounts[b] = getBitCount(nums, b);
  }

  const mostBits = bitCounts.map(c => (c >= nums.length / 2) ? 1 : 0);
  const gamma = parseInt(mostBits.join(""), 2);
  const epsilon = parseInt(mostBits.map(b => b ^ 1).join(""), 2);
  return gamma * epsilon;
}

const secondSolution = () => {
  let possOxy = nums;
  let possCo2 = nums;
  for (let b = 0; possOxy.length > 1; b++) {
    const mostCommonBit = (getBitCount(possOxy, b) >= possOxy.length / 2 ? 1 : 0);
    possOxy = possOxy.filter(n => n[b] == mostCommonBit);
  }
  for (let b = 0; possCo2.length > 1; b++) {
    const mostCommonBit = (getBitCount(possCo2, b) >= possCo2.length / 2 ? 1 : 0);
    possCo2 = possCo2.filter(n => n[b] == mostCommonBit^1);
  }
  const oxy = parseInt(possOxy[0].join(""), 2);
  const co2 = parseInt(possCo2[0].join(""), 2);
  return oxy * co2;
}

console.log("==[Day 3]=========")
console.log("1) " + firstSolution());
console.log("2) " + secondSolution());