const fs = require('fs');
const { intersection } = require('lodash')

// Split input into digits/output, and sort each of the digit strings.
const rgxInput = /(.+) \| (.+)/;
let input = fs.readFileSync('inputs/day8.txt').toString().split('\n')
  .map(x => x.match(rgxInput).splice(1)
  .map(y => y.split(' ')
  .map(z => z.split('').sort().join(''))));
  
/** Outputs solved digits in an array in index 2 of the line. */
const solveSimpleDigits = (line) => {
  const solvedDigits = Array(10);
  line[0].forEach((digit) => {
    switch (digit.length) {
      case 2: solvedDigits[1] = digit; break;
      case 3: solvedDigits[7] = digit; break;
      case 4: solvedDigits[4] = digit; break;
      case 7: solvedDigits[8] = digit; break;
    }
  });
  line[2] = solvedDigits;
}

/** Solves all the other digits based on the simple ones. */
const solveComplexDigits = (line) => {
  const solvedDigits = line[2];
  const simpleDigits = line[2].map(d => d.split(''));

  line[0].forEach((digit) => {
    if (solvedDigits.includes(digit)) return;
    const segments = digit.split('');
    const with4 = intersection(segments, simpleDigits[4]).length;
    const with7 = intersection(segments, simpleDigits[7]).length;
    const with8 = intersection(segments, simpleDigits[8]).length;
    if (with8 == 6) {
      if (with4 == 4)      { solvedDigits[9] = digit; }
      else if (with7 == 3) { solvedDigits[0] = digit; }
      else                 { solvedDigits[6] = digit; }
    } else {
      if (with4 == 2)      { solvedDigits[2] = digit; }
      else if (with7 == 3) { solvedDigits[3] = digit; }
      else                 { solvedDigits[5] = digit; }
    }
  });
}

const firstSolution = () => {
  const lines = [...input];
  return lines.reduce((solvedCount, line) => {
    solveSimpleDigits(line);
    return solvedCount +
      line[1].reduce((a, n) => a + line[2].includes(n), 0);
  }, 0);
}

const secondSolution = () => {
  const lines = [...input];
  return lines.reduce((outputSum, line) => {
    solveSimpleDigits(line);
    solveComplexDigits(line);
    const output = parseInt(line[1].map(d => line[2].indexOf(d)).join(''));
    return outputSum + output;
  }, 0);
}

console.log("==[Day 8]=========")
console.log("1) " + firstSolution());
console.log("2) " + secondSolution());