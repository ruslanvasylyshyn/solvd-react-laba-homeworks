// task 1 Sum of positive
// https://www.codewars.com/kata/5715eaedb436cf5606000381
function positiveSum(arr) {
  let filteredArray = arr.filter((num) => num >= 0);
  return filteredArray.reduce((acc, num) => acc + num, 0);
}

// task 2 Simple consecutive pairs
// https://www.codewars.com/kata/5a3e1319b6486ac96f000049
function pairs(ar) {
  let pairsCount = 0;
  for (let i = 0; i < ar.length; i = i + 2) {
    if (ar[i] === ar[i + 1] - 1 || ar[i] === ar[i + 1] + 1) {
      pairsCount = pairsCount + 1;
    }
  }
  return pairsCount;
}

// task 3 Maximum Multiple
// https://www.codewars.com/kata/5aba780a6a176b029800041c
function maxMultiple(divisor, bound) {
  return bound - (bound % divisor);
}

// task 4 JavaScript Array Filter
// https://www.codewars.com/kata/514a6336889283a3d2000001
function getEvenNumbers(numbersArray) {
  return numbersArray.filter((num) => num % 2 === 0);
}

// task 5 Max-min arrays
// https://www.codewars.com/kata/5a090c4e697598d0b9000004
function solve(arr) {
  let accArray = [...arr].sort((a, b) => a - b);
  let decArray = [...accArray].reverse();
  let finalArray = [];

  for (let i = 0; i < arr.length; i++) {
    finalArray.push(decArray[i]);
    finalArray.push(accArray[i]);
  }

  return finalArray.slice(0, arr.length);
}

// task 6 Return a string's even characters.
// https://www.codewars.com/kata/566044325f8fddc1c000002c
function evenChars(string) {
  if (string.length < 2 || string.length > 100) {
    return "invalid string";
  }
  let splitArray = string.split("");
  let finalArray = [];
  for (let i = 1; i < splitArray.length; i = i + 2) {
    finalArray.push(splitArray[i]);
  }
  return finalArray;
}

// task 7 Find the middle element
// https://www.codewars.com/kata/545a4c5a61aa4c6916000755
function gimme(triplet) {
  let sortArray = [...triplet].sort((a, b) => a - b);
  let index = triplet.indexOf(sortArray[1]);
  return index;
}

// task 8 Ones and Zeros
// https://www.codewars.com/kata/578553c3a1b8d5c40300037c
const binaryArrayToNumber = (arr) => {
  let binaryString = arr.join("");
  return parseInt(binaryString, 2);
};

// task 9 Find the unique number
// https://www.codewars.com/kata/585d7d5adb20cf33cb000235
function findUniq(arr) {
  let sortArray = [...arr].sort((a, b) => a - b);
  if (sortArray[1] === sortArray[0]) {
    return sortArray[sortArray.length - 1];
  }

  return sortArray[0];
}

// task 10 Decipher this!
// https://www.codewars.com/kata/581e014b55f2c52bb00000f8

function replaceCharCodeWithLetter(word) {
  if (!word) return word;

  let charCode = parseInt(word, 10);
  let charCodeToString = charCode.toString();
  let firstLetter = String.fromCharCode(charCode);
  let replacedWord = firstLetter + word.substring(charCodeToString.length);

  return replacedWord;
}

function swapSecondAndLastLetter(word) {
  if (word.length < 3) return word;
  let firstLetter = word[0];
  let secondLetter = word[1];
  let lastLetter = word[word.length - 1];

  let swappedWord =
    firstLetter +
    lastLetter +
    word.substring(2, word.length - 1) +
    secondLetter;
  return swappedWord;
}

function decipherThis(str) {
  let splitString = str.split(" ");

  let replaceFirstLetter = splitString.map((word) =>
    replaceCharCodeWithLetter(word)
  );

  let swapLetters = replaceFirstLetter.map((word) =>
    swapSecondAndLastLetter(word)
  );

  return swapLetters.join(" ");
}

// task 11 Sort the odd
// https://www.codewars.com/kata/578aa45ee9fd15ff4600090d
function sortArray(array) {
  const oddNumbers = array.filter((num) => num % 2 !== 0).sort((a, b) => a - b);

  let index = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] % 2 !== 0) {
      array[i] = oddNumbers[index];
      index++;
    }
  }

  return array;
}

// Optional (advanced)

// task 13 Moving Zeros To The End
// https://www.codewars.com/kata/52597aa56021e91c93000cb0
function moveZeros(arr) {
  let numArray = arr.filter((num) => num !== 0);
  let zeroArray = arr.filter((num) => num === 0);
  return [...numArray, ...zeroArray];
}

// task 15 Sudoku Solver
// https://www.codewars.com/kata/5296bc77afba8baa690002d7

function sudoku(puzzle) {
  function isValid(row, col, num) {
    for (let i = 0; i < 9; i++) {
      if (puzzle[row][i] === num) {
        return false;
      }
    }

    for (let i = 0; i < 9; i++) {
      if (puzzle[i][col] === num) {
        return false;
      }
    }

    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        if (puzzle[i][j] === num) {
          return false;
        }
      }
    }

    return true;
  }

  function solve() {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (puzzle[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (isValid(row, col, num)) {
              puzzle[row][col] = num;
              if (solve()) {
                return true;
              }
              puzzle[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  solve();
  return puzzle;
}
