const fs = require('fs');

const commands = fs.readFileSync('inputs/day2.txt').toString()
  .split('\n').map(c => c.split(' '));
commands.forEach(c => c[1] = parseInt(c[1]));

const firstSolution = () => {
  let x = 0, y = 0;
  commands.forEach(([dir, dist]) => {
    switch (dir) {
      case 'forward': x += dist; break;
      case 'down':    y += dist; break;
      case 'up':      y -= dist; break;
    }
  });
  return x * y;
}

const secondSolution = () => {
  let x = 0, y = 0, aim = 0;
  commands.forEach(([dir, dist]) => {
    switch (dir) {
      case 'forward': x += dist; y += aim * dist; break;
      case 'down':    aim += dist; break;
      case 'up':      aim -= dist; break;
    }
  });
  return x * y;
}

console.log("==[Day 2]=========")
console.log("1) " + firstSolution());
console.log("2) " + secondSolution());