const fs = require('fs');

const sections = fs.readFileSync('inputs/day13.txt').toString().split('\n\n');
const initDots = sections[0].split('\n').map(line => line.split(',').map(Number));
const folds = sections[1].split('\n').map(line => line.split('along ')[1].split('='));
folds.forEach(fold => fold[1] = Number(fold[1]));

const applyFold = (([axis, pos], dots) => {
  axis = (axis == 'x' ? 0 : 1);
  return dots.reduce((remaining, dot) => {
    if (dot[axis] >= pos) {
      dot[axis] = 2 * pos - dot[axis];
    }
    if (!remaining.some(b => b[0] == dot[0] && b[1] == dot[1])) {
      remaining.push(dot);
    }
    return remaining;
  }, []);
});

const printDots = (dots) => {
  const w = Math.max.apply(Math, dots.map(d => d[0]));
  const h = Math.max.apply(Math, dots.map(d => d[1]));
  let output = "";
  for (let y = 0; y <= h; y++) {
    if (output != "") { output += '\n';}
    for (let x = 0; x <= w; x++) {
      output += dots.some(d => d[0] == x && d[1] == y) ? '█' : ' ';
    }
  }
  return output;
}

const firstSolution = () => {
  let dots = [...initDots];
  dots = applyFold(folds[0], dots);
  return dots.length;
}

const secondSolution = () => {
  let dots = [...initDots];
  folds.forEach(fold => dots = applyFold(fold, dots));
  return '\n' + printDots(dots);
}

console.log("==[Day 13]=========")
console.log("1) " + firstSolution());
console.log("2) " + secondSolution());