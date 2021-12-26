const fs = require('fs');

const input = fs.readFileSync('inputs/day12.txt').toString()
  .split('\n').map(line => line.split('-'));
const connections = new Proxy({}, {get: (t, n) => n in t ? t[n] : (t[n] = [])})
input.forEach(([a, b]) => {
  connections[a].push(b);
  connections[b].push(a);
});

const countPaths = (node, canVisitTwice, visited = []) => {
  let count = 0;
  connections[node].forEach(child => {
    if (child == 'end') {
      count += 1;
    } else if (child != 'start') {
      let visitedTwice = canVisitTwice;
      if (visited.includes(child)) {
        if (!canVisitTwice) return;
        visitedTwice = false;
      }
      const smallCaves = [...visited];
      if (child == child.toLowerCase()) { smallCaves.push(child); }
      count += countPaths(child, visitedTwice, smallCaves);
    }
  });
  return count;
}

const firstSolution = () => {
  return countPaths('start', false);
}

const secondSolution = () => {
  return countPaths('start', true);
}

console.log("==[Day 12]=========")
console.log("1) " + firstSolution());
console.log("2) " + secondSolution());