const fs = require('fs');

const input = fs.readFileSync('inputs/day16.txt').toString().split('')
  .map(n => parseInt(n, 16).toString(2).padStart(4, '0')).join('');

let versionSum = 0;

/** returns [endIndex, value] */
const parseValue = (i) => {
  const version = parseInt(input.substring(i, i+=3), 2);
  const type    = parseInt(input.substring(i, i+=3), 2);
  versionSum += version;

  // literal
  if (type == 4) {
    const num = [];
    do {
      num.push(input.substring(i+1, i+=5));
    } while (input[i-5] == '1');
    return [i, parseInt(num.join(''), 2)];
  }
  
  // has subpackets
  const lengthType = input.substring(i, i+=1);
  const values = [];
  if (lengthType == '0') {
    // length in bits
    const length = parseInt(input.substring(i, i+=15), 2);
    const end = i + length;
    let value;
    while (i < end) {
      [i, value] = parseValue(i);
      values.push(value);
    }
  } else {
    // length in packets
    const length = parseInt(input.substring(i, i+=11), 2);
    let value;
    for (let p = 0; p < length; p++) {
      [i, value] = parseValue(i);
      values.push(value);
    }
  }

  switch (type) {
    case 0: return [i, values.reduce((a, v) => a + v, 0)];
    case 1: return [i, values.reduce((a, v) => a * v, 1)];;
    case 2: return [i, Math.min(...values)];;
    case 3: return [i, Math.max(...values)];;
    case 5: return [i, values[0] > values[1] ? 1 : 0];;
    case 6: return [i, values[0] < values[1] ? 1 : 0];;
    case 7: return [i, values[0] == values[1] ? 1 : 0];;
  }
}


const firstSolution = () => {
  parseValue(0);
  return versionSum;
}

const secondSolution = () => {
  return parseValue(0)[1];
}

console.log("==[Day 16]=========")
console.log("1) " + firstSolution());
console.log("2) " + secondSolution());