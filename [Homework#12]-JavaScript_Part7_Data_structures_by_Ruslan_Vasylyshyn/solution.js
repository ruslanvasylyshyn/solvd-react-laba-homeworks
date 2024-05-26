const fs = require("fs");
const data = require("./MOCK_DATA.js");

// Straight search
function straightSearch(array, sku) {
  for (let item of array) {
    if (item.sku === sku) {
      return item;
    }
  }
  return null;
}

// Binary search
function binarySearch(array, sku) {
  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midVal = array[mid].sku;

    if (midVal < sku) {
      left = mid + 1;
    } else if (midVal > sku) {
      right = mid - 1;
    } else {
      return array[mid];
    }
  }

  return null;
}

// Quick sort
function quickSort(array, left = 0, right = array.length - 1) {
  if (left >= right) {
    return;
  }

  const pivotIndex = Math.floor((left + right) / 2);
  const pivot = array[pivotIndex].sku;

  const index = partition(array, left, right, pivot);
  quickSort(array, left, index - 1);
  quickSort(array, index, right);
}

function partition(array, left, right, pivot) {
  while (left <= right) {
    while (array[left].sku < pivot) {
      left++;
    }

    while (array[right].sku > pivot) {
      right--;
    }

    if (left <= right) {
      [array[left], array[right]] = [array[right], array[left]];
      left++;
      right--;
    }
  }

  return left;
}

// Performance tests
function runPerformanceTests(data) {
  const logStream = fs.createWriteStream("result.log", { flags: "a" });

  // Straight search
  console.time("Straight Search");
  const straightSearchStartTime = Date.now();
  data.forEach((item) => straightSearch(data, item.sku));
  const straightSearchTime = Date.now() - straightSearchStartTime;
  console.timeEnd("Straight Search");
  logStream.write(`Straight Search: ${straightSearchTime} ms\n`);

  // Quick sort
  console.time("Sorting");
  const sortingStartTime = Date.now();
  quickSort(data);
  const sortingTime = Date.now() - sortingStartTime;
  console.timeEnd("Sorting");
  logStream.write(`Sorting: ${sortingTime} ms\n`);

  // Binary search
  console.time("Binary Search");
  const binarySearchStartTime = Date.now();
  data.forEach((item) => binarySearch(data, item.sku));
  const binarySearchTime = Date.now() - binarySearchStartTime;
  console.timeEnd("Binary Search");
  logStream.write(`Binary Search: ${binarySearchTime} ms\n`);

  logStream.write(`---\n`);
  logStream.end();
}

runPerformanceTests(data);
