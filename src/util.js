export default function shuffle(array) {
	let m = array.length;

	while (m) {
		const i = Math.floor(Math.random() * m--);
		const temp = array[m];
		array[m] = array[i];
		array[i] = temp;
	}

	return array;
}

export function populateArray(arr, genValue, start, end) {
	// Steps 3-5.
	var len = arr.length >>> 0;

	// Steps 6-7.
	var relativeStart = start >> 0;

	// Step 8.
	var k = relativeStart < 0 ?
	Math.max(len + relativeStart, 0) :
	Math.min(relativeStart, len);

	// Steps 9-10.
	var relativeEnd = end === undefined ?
	len : end >> 0;

	// Step 11.
	var finalValue = relativeEnd < 0 ?
	Math.max(len + relativeEnd, 0) :
	Math.min(relativeEnd, len);

	// Step 12.
	while (k < finalValue) {
		arr[k] = genValue();
		k++;
	}

	// Step 13.
	return arr;
}