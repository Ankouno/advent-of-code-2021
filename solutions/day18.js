const fs = require('fs');
const numRgx = new RegExp(/\d+/g);

// I'm sure there are more elegant solutions than this

const nums = fs.readFileSync('inputs/day18.txt').toString().split('\n');

const checkForSplit = (num) => {
  for (let i = 0; i < num.length; i++) {
    if (!isNaN(num[i])) {
      numRgx.lastIndex = i;
      const origVal = numRgx.exec(num)[0];
      if (origVal >= 10) {
        // split
        const left = Math.floor(origVal/2);
        const right = Math.ceil(origVal/2);
        const newVal = '[' + left + ',' + right + ']';
        num = num.substring(0, i) + newVal + num.substring(i + origVal.length);
        i += (newVal.length - origVal.length);
        return num;
      }
    }
  }
  return num;
}

const checkForExplosion = (num) => {
  let depth = 0;
  let prevIntInd = -1;
  for (let i = 0; i < num.length; i++) {
    if (num[i] == '[') {
      if (depth < 4) {
        depth++;
        continue;
      }

      // explode
      numRgx.lastIndex = i + 1;
      const left = numRgx.exec(num)[0];
      const right = numRgx.exec(num)[0];
      num = num.substring(0, i) + '0' + num.substring(i + left.length + right.length + 3);

      let nextIntInd = -1;
      for (let j = i+2; j < num.length; j++) {
        if (!isNaN(num[j])) {
          nextIntInd = j;
          break;
        }
      }

      if (nextIntInd >= 0) {
        numRgx.lastIndex = nextIntInd;
        const oldNext = numRgx.exec(num)[0];
        const newNext = (parseInt(oldNext) + parseInt(right)).toString();
        num = num.substring(0, nextIntInd) + newNext + num.substring(nextIntInd + oldNext.length);
      }
      if (prevIntInd >= 0) {
        numRgx.lastIndex = prevIntInd;
        const oldPrev = numRgx.exec(num)[0];
        const newPrev = (parseInt(oldPrev) + parseInt(left)).toString();
        i += newPrev.length - oldPrev.length;
        num = num.substring(0, prevIntInd) + newPrev + num.substring(prevIntInd + oldPrev.length);
      }
      return num;

    } else if (num[i] == ']') {
      depth--;
    } else if (!isNaN(num[i])) {
      prevIntInd = i;
      while (!isNaN(num[i+1])) { i++; };
    }
  }

  return num;
}

const reduceNumber = (num) => {
  let newNum = null;
  while (newNum != num) {
    num = newNum || num;
    newNum = checkForExplosion(num);
    if (newNum == num) {
      newNum = checkForSplit(num);
    }
  }
  return num;
}

const addNumbers = (a, b) => {
  return reduceNumber('[' + a + ',' + b + ']');
}

const getMagnitude = (num) => {
  let mag = 0;
  let depth = 0, mids = 0;
  for (let i = 0; i < num.length; i++) {
    switch (num[i]) {
      case '[': depth++; break;
      case ']': depth--; mids--; break;
      case ',': mids++; break;
      default: mag += num[i] * (3 ** (depth - mids)) * (2 ** mids);
    }
  }
  return mag;
}

//---------------------------------------------------------------------------

const firstSolution = () => {
  let result = nums[0];
  for (let i = 1; i < nums.length; i++) {
    result = addNumbers(result, nums[i]);
  }
  return getMagnitude(result);
}

const secondSolution = () => {
  let max = 0;
  for (let a = 0; a < nums.length - 1; a++) {
    for (let b = 1; b < nums.length; b++) {
      let ab = getMagnitude(addNumbers(nums[a], nums[b]));
      let ba = getMagnitude(addNumbers(nums[b], nums[a]));
      if (ab > max) { max = ab; }
      if (ba > max) { max = ba; }
    }
  }
  return max;
}

console.log("==[Day 18]=========")
console.log("1) " + firstSolution());
console.log("2) " + secondSolution());