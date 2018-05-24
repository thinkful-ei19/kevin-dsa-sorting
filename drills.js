'use strict';

const dataSet = [89, 30, 25, 32, 72, 70, 51, 42, 25, 24, 53, 55, 78, 50, 13, 40, 48, 32, 26, 2, 14, 33, 45, 72, 56, 44, 21, 88, 27, 68, 15, 62, 93, 98, 73, 28, 16, 46, 87, 28, 65, 38, 67, 16, 85, 63, 23, 69, 64, 91, 9, 70, 81, 27, 97, 82, 6, 88, 3, 7, 46, 13, 11, 64, 76, 31, 26, 38, 28, 13, 17, 69, 90, 1, 6, 7, 64, 43, 9, 73, 80, 98, 46, 27, 22, 87, 49, 83, 6, 39, 42, 51, 54, 84, 34, 53, 78, 40, 14, 5]

function swap(array, i, j) {
  const tmp = array[i];
  array[i] = array[j];
  array[j] = tmp;
};

function partition(array, start, end) {
  const pivot = array[end - 1];
  let j = start;
  for (let i=start; i<end - 1; i++) {
      if (array[i] <= pivot) {
          swap(array, i, j);
          j++;
      }
  }
  swap(array, end-1, j);
  return j;
};

function quickSort(array, start=0, end=array.length) {
  start = start;
  end = end;
  if (start >= end) {
    return array;
  }
  const middle = partition(array, start, end);
  array = quickSort(array, start, middle);
  array = quickSort(array, middle + 1, end);
  return array;
}

function mergeSort(array) {
  if (array.length <= 1) {
    return array;
  }

  const middle = Math.floor(array.length / 2);
  let left = array.slice(0, middle);
  let right = array.slice(middle, array.length);

  left = mergeSort(left);
  right = mergeSort(right);
  return mergeSort(left, right, array);
};

function insertionSort(array) {

  for(var i = 1; i < array.length; i++) {
    var temp = array[i];
    for(var j = i - 1; j >= 0 && array[j] > temp; j--) {
      array[j+1] = array[j];
    }
    array[j+1] = temp;
  }
  return array;

  // for (let i = 1; i < array.length; i++) {
  //   let temp = array[i];
  //   for (let j = i - 1; j >= 0 && array[j] > temp; j--) {
  //     array[j+1] = array[j];
  //   }
  //   array[j+1] = temp;
  // }
  // return array;
}

function bucketSort(array, bucketSize, minVal, maxVal) {
  const bucketCount = Math.floor((maxVal - minVal) / bucketSize) + 1;
  const allBuckets = new Array(bucketCount);

  array.forEach(function(currentVal) {
    if (currentVal < minVal) {
      minVal = currentVal;
    } else if (currentVal > maxVal) {
      maxVal = currentVal;
    }
  });

  for (let i = 0; i < allBuckets.length; i++) {
    allBuckets[i] = [];
  };

  array.forEach(function (currentVal) {
    allBuckets[Math.floor((currentVal - minVal) / bucketSize)].push(currentVal);
  });

  array.length = 0;

  allBuckets.forEach(function(bucket) {
    insertionSort(bucket);
    bucket.forEach(function (element) {
      array.push(element)
    });
  });
  return array;
}

// console.log(quickSort(dataSet));
// console.log(mergeSort(dataSet));
console.log(bucketSort(dataSet, 10, 1, 99));

