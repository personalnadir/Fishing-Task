import shuffle from './util';
import _ from 'underscore';

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const phase1PracticeImages = importAll(require.context('./images/fish/phase1practice', false, /\.(png|jpe?g|svg)$/));
const phase2PracticeImages = importAll(require.context('./images/fish/phase2practice', false, /\.(png|jpe?g|svg)$/));
const nonPracticeImages = importAll(require.context('./images/fish/phase1', false, /\.(png|jpe?g|svg)$/));

function convertToList(obj) {
	return Object.entries(obj).map(([filename, staticPath]) => ({
		type: filename.includes('Crab')? 'Crab': 'Fish',
		path: staticPath
	}));
}

const phase1Practice = convertToList(phase1PracticeImages);
const phase2Practice = convertToList(phase2PracticeImages);
const nonPractice = convertToList(nonPracticeImages);

function splitImages(combinedImages) {

	function selectImagesForPhases(images) {
		shuffle(images);
		const phase1 = images.slice(0, 6);
		const phase2b = images.slice(6);
		const phase2a = phase1.slice(0, 4);
		const phase2 = phase2a.concat(phase2b);

		const phase3b = phase1.slice(4, 8);
		const phase3 = phase2a.slice(0, 4).concat(phase3b);

		return {
			phase1,
			phase2,
			phase3
		};
	}

	const fishPhases = selectImagesForPhases(combinedImages.filter(img => img.type === 'Fish'));
	const crabPhases = selectImagesForPhases(combinedImages.filter(img => img.type === 'Crab'));
	return {
		phase1: fishPhases.phase1.concat(crabPhases.phase1),
		phase2: fishPhases.phase2.concat(crabPhases.phase2),
		phase3: fishPhases.phase3.concat(crabPhases.phase3)
	};
}

const phaseImages = splitImages(nonPractice);
const phase1 = phaseImages.phase1;
const phase2 = phaseImages.phase2;
const phase3 = phaseImages.phase3;

console.assert(_.intersection(phase1, phase2).length === 8, 'images: phase1 and phase2 do not share the right number of images');
const p23 = _.intersection(phase2, phase3).length;
const p13 = _.intersection(phase1, phase3).length;

console.assert(p23 === 8, `images: phase2 and phase3 do not share the right number of images ${p23}`);
console.assert(p13 === 12, `images: phase1 and phase3 do not share the right number of images ${p13}`);
export {phase1Practice, phase2Practice, phase1, phase2, phase3};