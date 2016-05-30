// bubble sort
// a classic terrible sorting algorithm, you keep looking through the array
// to find out if adjacent values need swapping, until no more values need swapping.

var swap = function(array, i, j) {
  var tmp = array[i];
  array[i] = array[j];
  array[j] = tmp;
}

var bubbleSort = function(array) {
  var swaps = 0;
  for (var i=0; i<array.length - 1; i++) {
    if (array[i] > array[i+1]) {
      swap(array, i, i+1);
      swaps++;
    }
  }

  if (swaps > 0) {
    return bubbleSort(array);
  }
  return array;
};

// best case is nodes are already in order so simply needs to check each pair once,
// an O(n) operation, worst case is each value needs swapping with each other value
// so O(n^2) which is also its avg case.

// Merge sort
// takes divide & conquer approach to sorting.  breaks array down into countinually smaller chunks, then merges back together in correct order.

var mergeSort = function(array) {
  if (array.length <= 1) {
    return array;
  }

  var middle = Math.floor(array.length/ 2);
  var left = array.slice(0, middle);
  var right = array.slice(middle, array.length);

  left = mergeSort(left);
  right = mergeSort(right);
  return merge(left, right, array);
};

// if the array has one or 0 elements its already sorted.  so return the array.  If not slice the array into 2 halves, sort each half by recursively calling mergeSort.  Then the 2 sorted halves are merged back together in the correct order using the merge function.

var merge = function(left, right, array) {
  var leftIndex = 0;
  var rightIndex = 0;
  var outputIndex = 0;
  while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
          array[outputIndex++] = left[leftIndex++];
      }
      else {
          array[outputIndex++] = right[rightIndex++];
      }
  }

  for (var i=leftIndex; i<left.length; i++) {
      array[outputIndex++] = left[i];
  }

  for (var i=rightIndex; i<right.length; i++) {
      array[outputIndex++] = right[i];
  }
  return array;
};

// To merge the two lists you just keep choosing the lowest value from the left or right arrays which hasn't already been added to the output array. When one of the arrays is empty then you just add all of the remaining values from the other to the array.

// Merge sort has a best, average, and worst case performances of O(nlog(n)). This is provably the lower limit for a sorting algorithm, and is significantly better than bubble sort's O(n^2).


// QuickSort

// O(nlog(n) best and avg case performance, but O(n^2) in worst case.  Despite this, quick sort is more commonly used than merge sort, as it is more cache efficient and can be easily performed in place (without additional memory allocation)

var quickSort = function(array, start, end) {
  start = start === undefined? 0 : start;
  end = end === undefined? 0 : end;
  if (start >= end) {
    return array;
  }
  var middle = partition(array, start, end);
  array = quickSort(array, start, middle);
  array = quickSort(array, middle + 1, end);
  return array;
};

// Quicksort again uses a divide and conquer approach. You partition the array into two halves around a pivot value. All of the values which are less than the pivot value go to one half of the array, and all of the values which are greater than the pivot go to the other half of the array. You then recursively sort the two halves of the array until the halves are of length 0 or 1.



// There are different partitioning algorithms. A common in-place algorithm is Lumoto's algorithm:

var partition = function(array, start, end) {
    var pivot = array[end - 1];
    var j = start;
    for (var i=start; i<end - 1; i++) {
        if (array[i] <= pivot) {
            swap(array, i, j);
            j++;
        }
    }
    swap(array, end-1, j);
    return j;
};
// The pivot is the final value in the array. You loop through the array, swapping values as you go to put them either side of the pivot point. And finally you put the pivot into the correct place in the array.
