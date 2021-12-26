const fs = require('fs');
const regexNums = /\d+/g;

const input = fs.readFileSync('inputs/day4.txt').toString().split('\n\n');
const nums = input[0].split(',').map(Number);
const boards = Array(input.length - 1);
for (let i = 1; i < input.length; i++) {
  boards[i-1] = input[i].split('\n').map(x => x.match(regexNums).map(Number));
}
const rowCount = boards[0].length;
const colCount = boards[0][0].length;

// For below functions:
// State is an array of how many numbers in each row/col have been called.

/** Checks whether a board has run with a new called number. */
const callNumber = (board, state, numCalled) => {
  for (let y = 0; y < rowCount; y++) {
    for (let x = 0; x < colCount; x++) {
      if (board[y][x] == numCalled) {
        state[y] += 1;
        state[x+rowCount] += 1;
        return (state[y] == rowCount) || (state[x+rowCount] == colCount);
      }
    }
  }
}

/** Gets the sum of unmarked numbers for a board. */
const getScore = (board, calledNums) => {
  let sum = 0;
  for (let y = 0; y < rowCount; y++) {
    for (let x = 0; x < colCount; x++) {
      const num = board[y][x];
      if (!calledNums.includes(num)) {
        sum += num;
      }
    }
  }
  return sum;
}

const firstSolution = () => {
  let states = Array.apply(null, Array(boards.length)).map(x => Array(rowCount + colCount).fill(0));
  for (let n = 0; n < nums.length; n++) {
    for (let b = 0; b < boards.length; b++) {
      const board = boards[b];
      const state = states[b];
      const called = nums[n];
      if (callNumber(board, state, called)) {
        return getScore(board, nums.slice(0, n + 1)) * called;
      }
    }
  }
}

const secondSolution = () => {
  let remaining = [...boards];
  let states = Array.apply(null, Array(boards.length)).map(x => Array(rowCount + colCount).fill(0));
  for (let n = 0; n < nums.length; n++) {
    for (let b = 0; b < remaining.length; b++) {
      const board = remaining[b];
      const state = states[b];
      const called = nums[n];
      if (callNumber(board, state, called)) {
        if (remaining.length == 1) {
          return getScore(board, nums.slice(0, n + 1)) * called;
        } else {
          remaining.splice(b, 1);
          states.splice(b, 1);
          b -= 1;
        }
      }
    }
  }
}

console.log("==[Day 4]=========")
console.log("1) " + firstSolution());
console.log("2) " + secondSolution());