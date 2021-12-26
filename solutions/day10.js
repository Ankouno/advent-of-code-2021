const fs = require('fs');

const input = fs.readFileSync('inputs/day10.txt').toString().split('\n');
const startChars = ['(', '[', '{', '<'];
const endChars =   [')', ']', '}', '>'];

/**
 * Parses a line, and returns either:
 *  - the first incorrect character if the line is corrupt
 *  - an array of remaining chars if the line is incomplete
 * */
const parseLine = (line) => {
  const charStack = [];
  for (let i = 0; i < line.length; i++) {
    const char = line.charAt(i);
    const expectedEnd = endChars[startChars.indexOf(char)];
    if (expectedEnd) {
      charStack.push(expectedEnd);
    } else if (char != charStack.pop()) {
      return char;
    }
  }
  return charStack;
}

const firstSolution = () => {
  return input.reduce((score, line) => {
    switch (parseLine(line)) {
      case ')': return score + 3;
      case ']': return score + 57;
      case '}': return score + 1197;
      case '>': return score + 25137;
      default:  return score;
    }
  }, 0);
}

const secondSolution = () => {
  const scores = input.reduce((scores, line) => {
    const queue = parseLine(line);
    if (typeof(queue) == 'string') { return scores; }

    scores.push(queue.reverse().reduce((s, c) => {
      s *= 5;
      switch (c) {
        case ')': return s + 1;
        case ']': return s + 2;
        case '}': return s + 3;
        case '>': return s + 4;
        default:  return s;
      }
    }, 0));
    return scores;
  }, []);
  
  scores.sort((a, b) => b - a);
  return scores[(scores.length - 1) / 2];
}

console.log("==[Day 10]=========")
console.log("1) " + firstSolution());
console.log("2) " + secondSolution());