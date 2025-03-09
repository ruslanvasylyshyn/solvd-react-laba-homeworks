// task 1 Opposite number
// http://www.codewars.com/kata/opposite-number
function opposite(number) {
  return number * -1;
}

// task 2 Basic Mathematical Operations
// http://www.codewars.com/kata/basic-mathematical-operations
function basicOp(operation, value1, value2) {
  switch (operation) {
    case "+":
      return value1 + value2;
      break;

    case "-":
      return value1 - value2;
      break;

    case "*":
      return value1 * value2;
      break;

    case "/":
      return value1 / value2;
      break;

    default:
      return 0;
  }
}

// task 3 Printing Array elements with Comma delimiters
// http://www.codewars.com/kata/printing-array-elements-with-comma-delimiters
function printArray(array) {
  return array.join(",");
}

// task 4 Transportation on vacation
// http://www.codewars.com/kata/transportation-on-vacation
function rentalCarCost(d) {
  if (d >= 3 && d <= 6) {
    return d * 40 - 20;
  }

  if (d >= 7) {
    return d * 40 - 50;
  }

  return d * 40;
}

// task 5 Calculating with Functions
// http://www.codewars.com/kata/calculating-with-functions
function executeValue(callback, value) {
  return typeof callback === "function" ? callback(value) : value;
}

function zero(callback) {
  const value = 0;
  return executeValue(callback, value);
}
function one(callback) {
  const value = 1;
  return executeValue(callback, value);
}
function two(callback) {
  const value = 2;
  return executeValue(callback, value);
}
function three(callback) {
  const value = 3;
  return executeValue(callback, value);
}
function four(callback) {
  const value = 4;
  return executeValue(callback, value);
}
function five(callback) {
  const value = 5;
  return executeValue(callback, value);
}
function six(callback) {
  const value = 6;
  return executeValue(callback, value);
}
function seven(callback) {
  const value = 7;
  return executeValue(callback, value);
}
function eight(callback) {
  const value = 8;
  return executeValue(callback, value);
}
function nine(callback) {
  const value = 9;
  return executeValue(callback, value);
}

function plus(a) {
  console.log(a, "a");
  return function (b) {
    console.log(b, "b");
    return a + b;
  };
}
function minus(a) {
  return function (b) {
    return b - a;
  };
}
function times(a) {
  return function (b) {
    return b * a;
  };
}
function dividedBy(a) {
  return function (b) {
    return Math.floor(b / a);
  };
}

// task 6 Get the Middle Character
// http://www.codewars.com/kata/get-the-middle-character
function getMiddle(s) {
  let splitWord = s.split("");
  let middlePositionOfWord = Math.floor(splitWord.length / 2);

  if (splitWord.length % 2 === 1) {
    return splitWord[middlePositionOfWord];
  } else {
    return (
      splitWord[middlePositionOfWord - 1] + splitWord[middlePositionOfWord]
    );
  }
}

// task 7 Partition On
// http://www.codewars.com/kata/partition-on
function partitionOn(pred, items) {
  let boundaryIndex = 0;

  for (let i = 0; i < items.length; i++) {
    if (!pred(items[i])) {
      let removedItem = items.splice(i, 1)[0];
      items.splice(boundaryIndex, 0, removedItem);
      boundaryIndex++;
    }
  }

  return boundaryIndex;
}

// task 8 Counting Duplicates  (Took another task because previous link doesn't work)
// https://www.codewars.com/kata/54bf1c2cd5b56cc47f0007a1
function duplicateCount(text) {
  let newText = text.toLowerCase().split("").sort();
  let amount = 0;

  for (let i = 0; i < newText.length; i++) {
    let index = newText.lastIndexOf(newText[i]);

    if (index > i) {
      amount++;
      i = index;
    } else {
      i++;
    }
  }
  return amount;
}

// task 9 Find the odd int
// https://www.codewars.com/kata/find-the-odd-int/
function findOdd(A) {
  let count = 0;
  for (let i = 0; i < A.length; i++) {
    for (let l = 0; l < A.length; l++) {
      if (A[i] === A[l]) {
        count++;
      }
    }
    if (count % 2 !== 0) {
      return A[i];
    }
  }
}

// task 10 Find The Parity Outlier
// https://www.codewars.com/kata/find-the-parity-outlier
function findOutlier(integers) {
  let countOddNumber = 0;
  let countEvenNumber = 0;

  for (let i = 0; i < 3; i++) {
    if (integers[i] % 2 === 0) {
      countEvenNumber += 1;
    } else {
      countOddNumber += 1;
    }
  }

  if (countOddNumber >= 2) {
    return +integers.filter((value) => value % 2 === 0);
  } else {
    return +integers.filter((value) => value % 2 !== 0);
  }
}

// task 11 zipWith
// https://www.codewars.com/kata/zipwith
function zipWith(fn, a0, a1) {
  let arrayLength = 0;
  let finalArray = [];
  if (a0.length > a1.length) {
    arrayLength = a1.length;
  } else if (a0.length < a1.length) {
    arrayLength = a0.length;
  } else {
    arrayLength = a0.length;
  }

  for (let i = 0; i < arrayLength; i++) {
    finalArray.push(fn(a0[i], a1[i]));
  }

  return finalArray;
}

// task 12 Filter the number
// https://www.codewars.com/kata/filter-the-number
var filterString = function (value) {
  let valueSplited = value.split("");
  let finalNumber = [];

  for (let i = 0; i < valueSplited.length; i++) {
    if (valueSplited[i] % 1 === 0) {
      finalNumber.push(valueSplited[i]);
    }
  }

  return +finalNumber.join("");
};

// task 13 N-th Fibonacci
// https://www.codewars.com/kata/n-th-fibonacci
function nthFibo(n) {
  let fibonacciArray = [0, 1];
  if (fibonacciArray.length >= n) {
    return fibonacciArray[n - 1];
  }

  for (let i = fibonacciArray.length; i < n; i++) {
    fibonacciArray.push(
      fibonacciArray[fibonacciArray.length - 2] +
        fibonacciArray[fibonacciArray.length - 1]
    );
  }
  return fibonacciArray[n - 1];
}

// task 14 Cat and Mouse - 2D Version
// https://www.codewars.com/kata/cat-and-mouse-2d-version/
function catMouse(map, moves) {
  if (!map.includes("C") || !map.includes("m")) {
    return "boring without two animals";
  }

  const rows = map.split("\n");
  let catPos;
  let mousePos;

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const catIndex = row.indexOf("C");
    const mouseIndex = row.indexOf("m");

    if (catIndex !== -1) {
      catPos = { row: i, col: catIndex };
    }

    if (mouseIndex !== -1) {
      mousePos = { row: i, col: mouseIndex };
    }
  }

  const distance =
    Math.abs(catPos.row - mousePos.row) + Math.abs(catPos.col - mousePos.col);

  if (distance <= moves) {
    return "Caught!";
  } else {
    return "Escaped!";
  }
}

// task 15 Duplicate Encoder
// https://www.codewars.com/kata/duplicate-encoder
function duplicateEncode(word) {
  let loverCaseWorld = word.toLowerCase();
  let str = "";
  for (let i = 0; i < loverCaseWorld.length; i++) {
    if (
      loverCaseWorld.indexOf(loverCaseWorld[i]) ===
      loverCaseWorld.lastIndexOf(loverCaseWorld[i])
    ) {
      str = str + "(";
    } else {
      str = str + ")";
    }
  }

  return str;
}

// task 16 Additive Numbers
// https://www.codewars.com/kata/5693239fb761dc8670000001
function findAdditiveNumbers(num) {
  const data = [],
    candidates = [];

  function getStarters(index) {
    const first = num.substring(0, index),
      rest = num.substring(index);
    const results = [first];
    for (let i = 1; i < rest.length + 1; i++) {
      const chunk = rest.substring(0, i);
      results.push(chunk);
    }
    return results.map((el) => +el);
  }

  for (let i = 1; i < num.length; i++) {
    data.push(getStarters(i));
  }

  for (let i = 0; i < data.length; i++) {
    const chunk = [...data[i]],
      first = chunk.shift();

    while (chunk.length) {
      const candidate = [first],
        second = chunk.shift();
      candidate.push(second);

      while (candidate.join("").length < num.length) {
        const s1 = candidate[candidate.length - 1],
          s2 = candidate[candidate.length - 2];
        const sum = s1 + s2;
        candidate.push(sum);
      }

      if (candidate.length > 2) {
        candidates.push(candidate);
      }
    }
  }

  const result = candidates.find((el) => el.join("").startsWith(num));
  return result ? result.map((el) => el.toString()) : [];
}

// task 17 Build Tower
// https://www.codewars.com/kata/576757b1df89ecf5bd00073b
function towerBuilder(nFloors) {
  let tower = [];
  let width = nFloors * 2 - 1;

  for (let i = 0; i < nFloors; i++) {
    let stars = "*".repeat(i * 2 + 1);
    let spaces = " ".repeat((width - stars.length) / 2);
    let level = spaces + stars + spaces;
    tower.push(level);
  }

  return tower;
}

// task 18 Mexican Wave
// https://www.codewars.com/kata/58f5c63f1e26ecda7e000029
function wave(str) {
  let result = [];

  for (let i = 0; i < str.length; i++) {
    if (str[i] !== " ") {
      let modifiedStr =
        str.substring(0, i) + str[i].toUpperCase() + str.substring(i + 1);
      result.push(modifiedStr);
    }
  }
  return result;
}

// task 19 String Breakers (retired)
// https://www.codewars.com/kata/59d398bb86a6fdf100000031

function stringBreakers(n, string) {
  let regex = new RegExp(".{1," + n + "}", "g");

  return string.split(" ").join("").match(regex).join("\n");
}

// task 20 Extract the domain name from a URL
// https://www.codewars.com/kata/514a024011ea4fb54200004b

function domainName(url) {
  if (
    url.startsWith("http://www") ||
    url.startsWith("https://www") ||
    url.startsWith("www")
  ) {
    return url.split(".")[1];
  }

  if (url.startsWith("http")) {
    let cutProtocol = url.split("//");
    return cutProtocol[1].split(".")[0];
  }

  return url.split(".")[0];
}
