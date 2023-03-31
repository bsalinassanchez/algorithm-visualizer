// This is the main color of the array bars.
const PRIMARY_COLOR = "aquamarine";

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = "red";

//const LARGEST = "green";

export function getMergeSortAnimations(array) {
	//initialize array that holds the steps to be animated
	const animations = [];

	//case if array is already sorted
	if (array.length <= 1) return array;
	const auxiliaryArray = array.slice();
	mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
	return animations;
}

export function getHeapSortAnimations(array) {
	//initialize array that holds the steps to be animated
	const animations = [];

	//case if array is already sorted
	if (array.length <= 1) return array;

	//method that pushes steps to be animated into animations array
	heapSortHelper(array, animations);
	return animations;
}

export function getSelectionSortAnimations(array) {
	//initialize array that holds the steps to be animated
	const animations = [];

	//case if array is already sorted
	if (array.length <= 1) return array;

	//method that pushes steps to be animated into animations array
	selectionSortHelper(array, animations);
	return animations;
}

export function getBubbleSortAnimations(array) {
	//initialize array that holds the steps to be animated
	const animations = [];

	//case if the array is already sorted
	if (array.length <= 1) return array;

	//method that pushes steps to be animated into animations array
	bubbleSortHelper(array, animations);
	return animations;
}

export function bubbleSortHelper(array, animations) {
	//size of the original array
	const size = array.length;

	//method that pushes steps to be animated into animations array
	bubbleSort(array, size, animations);
}

export function swapBubble(array, largest, smallest, animations) {
	let temp = array[largest];
	animations.push([largest, array[smallest], false, 0]);
	array[largest] = array[smallest];
	animations.push([smallest, temp, false, 0]);
	array[smallest] = temp;
}

export function bubbleSort(array, size, animations) {
	for (let i = 0; i < size - 1; i++) {
		for (let j = 0; j < size - i - 1; j++) {
			if (array[j] > array[j + 1]) {
				swapBubble(array, j, j + 1, animations);
			}
		}

		animations.push([size - i - 1, size - i - 1, true, "DodgerBlue"]);
	}

	animations.push([0, 0, true, "DodgerBlue"]);
}

export function selectionSortHelper(array, animations) {
	//size of the original array
	const size = array.length;

	//method that pushes steps to be animated into animations array
	selectionSort(array, size, animations);
}

/**
 *
 * @param {original array} array
 * @param {minimum index} min_idx
 * @param {root} root
 * @param {animations array} animations
 * method that swaps the largest and smallest elements in the array.
 * the largest and smallest elements are located at root and min_idx respectively
 */
function swap(array, min_idx, root, animations) {
	//temporarily hold the smallest element
	let temp = array[min_idx];
	animations.push([min_idx, array[root], false, 0]);

	//set smallest element to the largest element
	array[min_idx] = array[root];
	animations.push([root, temp, false, 0]);
	animations.push([root, root, true, "DodgerBlue"]);

	//set largest element to the smallest element, completing the swap
	array[root] = temp;
}

function selectionSort(array, size, animations) {
	/*
	for (let i = 0; i < size - 1; i++) {
		let anchor = i;
		let min = i;
		for (let j = i + 1; i < size; j++) {
			if (array[j] < array[min]) min = j;
		}
		//swap
		if (anchor !== min) {
			let temp = array[min];
			array[min] = array[anchor];
			array[anchor] = temp;
		}
	}
	*/

	// One by one move boundary of unsorted subarray
	for (let i = 0; i < size - 1; i++) {
		// Find the minimum element in unsorted array
		let min_idx = i;
		let old_min_idx = min_idx;
		//animations.push([min_idx, min_idx, true, "orange"]);
		for (let j = i + 1; j < size; j++) {
			//animations.push([j, j, true, SECONDARY_COLOR]);
			if (array[j] < array[min_idx]) {
				//animations.push([j, j, true, "yellow"]);
				min_idx = j;
				//animations.push([min_idx, min_idx, true, SECONDARY_COLOR]);
				//animations.push([min_idx, min_idx, true, PRIMARY_COLOR]);
			}
		}
		//animations.push([old_min_idx, old_min_idx, true, PRIMARY_COLOR]);

		// Swap the found minimum element with the first element
		swap(array, min_idx, i, animations);
	}

	//finalize last element
	animations.push([array.length - 1, array.length - 1, true, "DodgerBlue"]);
}

//
export function heapSortHelper(array, animations) {
	//number of nodes in heap
	let numNodes = array.length;
	if (numNodes === 1) return;

	for (let i = Math.floor(numNodes / 2) - 1; i >= 0; i--) {
		heapify(array, numNodes, i, animations);
	}

	for (let i = numNodes - 1; i > 0; i--) {
		let temp = array[0]; //curr root or largest number
		animations.push([0, array[i], false, 0]);
		array[0] = array[i];
		animations.push([i, temp, false, 0]);
		animations.push([i, i, true, "DodgerBlue"]);
		array[i] = temp;

		//heapify again, but this time the largest element remains at end of array(heap)
		heapify(array, i, 0, animations);
	}

	animations.push([0, 0, true, "DodgerBlue"]);
}

//animations.push(index1,index2, iscolorchange, isprimarycolor/secondarycolor/largest )
export function heapify(array, numNodes, index, animations) {
	let largest = index;
	let leftChild = 2 * index + 1;
	let rightChild = 2 * index + 2;

	//check childs
	//if left is larger than root...

	if (leftChild < numNodes && array[leftChild] > array[largest]) {
		animations.push([leftChild, largest, true, SECONDARY_COLOR]);
		animations.push([leftChild, largest, true, PRIMARY_COLOR]);
		//animations.push([leftChild, leftChild, true, LARGEST]);
		largest = leftChild;
	} else {
		//animations.push([largest, largest, true, LARGEST]);
	}

	//if the right child is largest...
	//CHECK IF RIGHTCHILD IS WITHIN BARS!!!!!
	if (rightChild < numNodes && array[rightChild] > array[largest]) {
		animations.push([rightChild, largest, true, SECONDARY_COLOR]);
		animations.push([rightChild, largest, true, PRIMARY_COLOR]);
		//animations.push([rightChild, rightChild, true, LARGEST]);
		largest = rightChild;
	} else {
		//animations.push([largest, largest, true, LARGEST]);
	}

	//if largest is not root, heapify again
	if (largest !== index) {
		// animations.push([indexofbar, newheightofbar, false, ])
		let swap = array[index];

		animations.push([index, array[largest], false, 0]);
		array[index] = array[largest];
		animations.push([largest, swap, false, 0]);
		array[largest] = swap;

		//animations.push([index, array[largest], false, 0]);
		//animations.push([largest, swap, false, 0]);

		heapify(array, numNodes, largest, animations);
	} else {
		//animations.push([largest, largest, true, LARGEST]);
		animations.push([largest, largest, true, PRIMARY_COLOR]);
	}
}

function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations) {
	if (startIdx === endIdx) return;
	const middleIdx = Math.floor((startIdx + endIdx) / 2);
	mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
	mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
	doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) {
	let k = startIdx;
	let i = startIdx;
	let j = middleIdx + 1;
	while (i <= middleIdx && j <= endIdx) {
		// These are the values that we're comparing; we push them once
		// to change their color.
		animations.push([i, j]);
		// These are the values that we're comparing; we push them a second
		// time to revert their color.
		animations.push([i, j]);
		if (auxiliaryArray[i] <= auxiliaryArray[j]) {
			// We overwrite the value at index k in the original array with the
			// value at index i in the auxiliary array.
			animations.push([k, auxiliaryArray[i]]);
			mainArray[k++] = auxiliaryArray[i++];
		} else {
			// We overwrite the value at index k in the original array with the
			// value at index j in the auxiliary array.
			animations.push([k, auxiliaryArray[j]]);
			mainArray[k++] = auxiliaryArray[j++];
		}
	}
	while (i <= middleIdx) {
		// These are the values that we're comparing; we push them once
		// to change their color.
		animations.push([i, i]);
		// These are the values that we're comparing; we push them a second
		// time to revert their color.
		animations.push([i, i]);
		// We overwrite the value at index k in the original array with the
		// value at index i in the auxiliary array.
		animations.push([k, auxiliaryArray[i]]);
		mainArray[k++] = auxiliaryArray[i++];
	}
	while (j <= endIdx) {
		// These are the values that we're comparing; we push them once
		// to change their color.
		animations.push([j, j]);
		// These are the values that we're comparing; we push them a second
		// time to revert their color.
		animations.push([j, j]);
		// We overwrite the value at index k in the original array with the
		// value at index j in the auxiliary array.
		animations.push([k, auxiliaryArray[j]]);
		mainArray[k++] = auxiliaryArray[j++];
	}
}

//if graph[i][j] == 3 then that means theres a barrier in place
export function bfsPath(graph, start, target, size) {
	if (target === undefined) {
		return [];
	}
	/**
	 * false = not visited
	 * true = visited
	 */

	const visited = Array(size)
		.fill()
		.map((_, indexH) =>
			Array(size)
				.fill()
				.map((_, indexW) => false)
		);
	//create queue for bfs
	const queue = [];

	const path = [];

	let prev = null;

	//mark start node as visited and enqueue it
	visited[start[0]][start[1]] = true;
	queue.push([start[0], start[1], prev]);
	let found = false;
	while (queue.length > 0) {
		const tile = queue[0]; //tile == [0,0,null]
		path.push(tile); //prev = null
		//check if itle is the target
		if (tile[0] === target[0] && tile[1] === target[1]) {
			found = true;
			break;
		}
		prev = [tile[0], tile[1]]; //prev = [0,0]
		queue.shift();

		if (
			tile[0] - 1 >= 0 &&
			visited[tile[0] - 1][tile[1]] === false &&
			graph[tile[0] - 1][tile[1]] !== 3
		) {
			if ([tile[0] - 1, tile[1]] === target) return path;
			visited[tile[0] - 1][tile[1]] = true;
			queue.push([tile[0] - 1, tile[1], prev]);
		}
		if (
			tile[1] - 1 >= 0 &&
			visited[tile[0]][tile[1] - 1] === false &&
			graph[tile[0]][tile[1] - 1] !== 3
		) {
			if ([tile[0], tile[1] - 1] === target) return path;
			visited[tile[0]][tile[1] - 1] = true;
			queue.push([tile[0], tile[1] - 1, prev]);
		}
		if (
			tile[0] + 1 < size &&
			visited[tile[0] + 1][tile[1]] === false &&
			graph[tile[0] + 1][tile[1]] !== 3
		) {
			if ([tile[0] + 1, tile[1]] === target) return path;
			visited[tile[0] + 1][tile[1]] = true;
			queue.push([tile[0] + 1, tile[1], prev]);
		}
		if (
			tile[1] + 1 < size &&
			visited[tile[0]][tile[1] + 1] === false &&
			graph[tile[0]][tile[1] + 1] !== 3
		) {
			if ([tile[0], tile[1] + 1] === target) return path;
			visited[tile[0]][tile[1] + 1] = true;
			queue.push([tile[0], tile[1] + 1, prev]);
		}
	}
	//return path;
	return bfsHelper(path, found);
}

//pop()
function bfsHelper(path, found) {
	if (found === false) return [];
	const newPath = [];
	//always push last element
	let unit = path[path.length - 1];
	let prev = unit[2];
	newPath.unshift(unit[0] + "-" + unit[1]);
	for (let i = path.length - 1; i >= 0; i--) {
		if (prev === null) break;
		if (prev[0] === path[i][0] && prev[1] === path[i][1]) {
			newPath.unshift(path[i][0] + "-" + path[i][1]);
			prev = path[i][2];
		}
	}
	//traverse path backwards, then reverse

	return newPath;
}
