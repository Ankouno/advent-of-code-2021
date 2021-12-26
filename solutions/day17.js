const fs = require('fs');

const [minX, maxX, minY, maxY] = fs.readFileSync('inputs/day17.txt').toString()
  .match(/-?\d+/g).map(Number);
  
const testProbe = (vx, vy) => {
  let x = 0; y = 0;
  while (x < maxX && y > minY) {
    x += vx;
    y += vy;
    if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
      return true;
    }
    vx += (vx > 0 ? -1 : (vx < 0 ? 1 : 0));
    vy -= 1;
  }
  return false;
}

const firstSolution = () => minY * (minY + 1) / 2;
const secondSolution = () => {
  const min_vx = Math.ceil((Math.sqrt(minX*8 + 1) / 2) - 1);
  const max_vx = maxX;
  const min_vy = minY;
  const max_vy = firstSolution();

  let hits = 0;
  for (let vy = min_vy; vy <= max_vy; vy++) {
    for (let vx = min_vx; vx <= max_vx; vx++) {
      if (testProbe(vx, vy)) hits += 1;
    }
  }
  return hits;
}

console.log("==[Day 17]=========")
console.log("1) " + firstSolution());
console.log("2) " + secondSolution());