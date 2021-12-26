const fs = require('fs');

class DefaultDict {
  constructor(defaultVal) {
    return new Proxy({}, { get: (t, n) => n in t ? t[n] : defaultVal })
  }
}

let [polymer, rules] = fs.readFileSync('inputs/day14.txt').toString().split('\n\n');
let initPairs = new DefaultDict(0);
for (let i = 0; i < polymer.length - 1; i++) {
  const pair = polymer.substring(i, i + 2);
  initPairs[pair] += 1;
}
rules = rules.split('\n').reduce((o, line) => {
  const [a, b] = line.split(' -> ');
  o[a] = b;
  return o;
}, {});

const iteratePairs = (pairs) => {
  const newPairs = new DefaultDict(0);
  Object.keys(pairs).forEach(p => {
    const insert = rules[p];
    newPairs[p[0] + insert] += pairs[p];
    newPairs[insert + p[1]] += pairs[p];
  })
  return newPairs;
}

const iterate = (n) => {
  let pairs = initPairs;
  for (let i = 0; i < n; i++) {
    pairs = iteratePairs(pairs);
  }

  const counts = new DefaultDict(0);
  Object.keys(pairs).forEach(p => {
    const [a, b] = p.split('');
    counts[a] += pairs[p];
    counts[b] += pairs[p];
  })

  const elems = Object.keys(counts);
  const max = elems.reduce((a, b) => a > counts[b] ? a : counts[b], 0);
  const min = elems.reduce((a, b) => a < counts[b] ? a : counts[b], Infinity);

  // results divided by 2 to account for double-counting
  return Math.ceil(max / 2) - Math.ceil(min / 2);
}

const firstSolution = () => iterate(10);
const secondSolution = () => iterate(40);

console.log("==[Day 14]=========")
console.log("1) " + firstSolution());
console.log("2) " + secondSolution());