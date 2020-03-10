import shuffle from './util';
import {getKeyCodes} from './KeyPressed';
import _ from 'underscore';

function populateArray(arr, genValue, start, end) {
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
export default function createTrials(images, numBlocks, trialBlock) {
	let blocks = new Array(numBlocks * trialBlock.length);

	const createBlockTrials = block => shuffle(trialBlock.slice());

	for (let i = 0; i < numBlocks; i++) {
		const trials = createBlockTrials(trialBlock);
		for (let k = 0; k < trialBlock.length; k ++) {
			blocks[(i * trialBlock.length) + k] = trials[k];
		}
	}

	return blocks;
}

function forceKeys(trials, forFirst) {
	let mistakes = new Array(trials.length);
	const numMistakes = forFirst / 2;
	mistakes.fill(false);
	mistakes.fill(true, forFirst - numMistakes, forFirst);

	const comparitor = (a, b) => {
		if (a.rule === 'Accept') {
			if (b.rule !== a.rule) {
				return -1;
			} else {
				return 0;
			}
		} else {
			if (b.rule !== a.rule) {
				return 1;
			} else {
				return 0;
			}
		}
	}
	let fish = trials.filter(trial => trial.type === 'Fish').sort(comparitor);
	let crabs = trials.filter(trial => trial.type === 'Crab').sort(comparitor);

	let accept = false;
	for (let i = 0; i < trials.length; i++) {
		let list;
		if (i % 2 === 0) {
			list = fish;
		} else {
			list = crabs;
		}
		let trial;
		if (accept) {
			trial = list.shift();
		} else {
			trial = list.pop();
		}

		if (i % 4 === 0) {
			accept = !accept;
		}

		const highlightKey = i < forFirst;
		trial.forceMistake = mistakes[i];
		trial.forceKey = true;
		trial.highlightKey = highlightKey;
		trials[i] = trial;
	}

	return trials;
}

function mapImagePathsToKeys(images) {

	console.assert((images.length % 4) === 0, "trials.js: mapImagePathsToKeys assumes image array length to be a multiple of 4. Length is " + images.length);

	let imageKeyCodes = new Array(images.length);
	let index = 0;
	const loops = images.length / 4;
	for (let i = 0; i < loops; i ++) {
		for (const keyCode of getKeyCodes()) {
			imageKeyCodes[index] = keyCode;
			index ++;
		}
	}

	shuffle(imageKeyCodes);
	let keyLookUp = {};
	for (const image of images) {
		keyLookUp[image.path] = imageKeyCodes.pop();
	}

	return keyLookUp;
}

function ensureKeysAreUnique(pathToKeys1, pathToKeys2) {
	const matchingKeys = _.intersection(pathToKeys1, pathToKeys2);

	let matches = [];
	let nonMatches = [];
	_.mapObject(pathToKeys1, (val, key) => {
		if (pathToKeys2[key] === val) {
			matches.push(key);
		} else {
			nonMatches.push(key);
		}
	});
	if (matches.length === 0) {
		return;
	}

	shuffle(nonMatches);
	for (const key of matches) {
		const val = pathToKeys1[key];
		for (const repKey of nonMatches) {
			if (pathToKeys1[repKey] === val) {
				continue;
			}

			const temp = pathToKeys1[repKey];
			pathToKeys1[repKey] = val;
			pathToKeys1[key] = temp;
			break;
		}
	}

	ensureKeysAreUnique(pathToKeys1, pathToKeys2);
}

export {forceKeys, mapImagePathsToKeys, ensureKeysAreUnique};