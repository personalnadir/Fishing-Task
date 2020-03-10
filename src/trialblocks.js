import {phase1Practice, phase1, phase2, phase3} from './images';

export function createPhase1Block(images) {
	const fishImages = images.filter(img => img.type === 'Fish');
	const crabImages = images.filter(img => img.type === 'Crab');

	const trialFactory = (img, i) => ({
		type: img.type,
		image: img.path,
		rule: (i % 2 == 0)? 'Accept' : 'Reject'
	});
	return fishImages.map(trialFactory).concat(crabImages.map(trialFactory));
}

export function createPhase2Block(images, phase1Block) {
	let phase1LookUp = {};

	phase1Block.forEach(val=> {
		phase1LookUp[val.image] = val.rule === 'Accept'? 'Tax' : 'Subsidy';
	});

	const newImages = images.filter(img => img.path in phase1Block === false);
	const phase1Images = images.filter(img => img.path in phase1Block);
	return createPhase1Block(newImages).concat(phase1Images.map(img => ({
			type: img.type,
			rule: phase1LookUp[img.path],
			image: img.path
		})
	));
}

export function createPhase3Block(images, phase1Block, phase2Block) {
	const addValToObjList = (obj, key, val) => {
		let list;
		if (key in obj) {
			list = obj[key];
			list.push(val);
		} else {
			list = [val];
		}
		obj[key] = list;
	}

	let phase1LookUp = {};
	let phase1RuleLookUp = {};
	phase1Block.forEach(val => {
		phase1LookUp[val.image] = val.rule;
		addValToObjList(phase1RuleLookUp, val.rule, val);
	});

	let phase2LookUp = {};
	let phase2RuleLookUp = {};
	phase2Block.forEach(val => {
		phase2LookUp[val.image] = val.rule;
		addValToObjList(phase2RuleLookUp, val.rule, val);
	});

	const freeChoice = images.filter(img => img.path in phase2LookUp === false);

	const selectedImg = {};
	freeChoice.forEach(img => selectedImg[img.path] = true);
	const getUnusedImg = list => {
		let img;
		do {
			img = list.pop();
		} while (img.image in selectedImg);
		selectedImg[img.image] = true;
		return img;
	}

	const rules = {
		CompatibleApproach: () => getUnusedImg(phase1RuleLookUp['Accept']),
		CompatibleAvoid: () => getUnusedImg(phase1RuleLookUp['Reject']),
		IncompatibleApproach: () => getUnusedImg(phase2RuleLookUp['Accept']),
		IncompatibleAvoid: () => getUnusedImg(phase2RuleLookUp['Reject']),
	}

	return freeChoice.map(img => ({
		type: img.type,
		rule: 'FreeChoice',
		image: img.path
	})).concat(Object.values(rules).map(func => func()))
	.concat(Object.values(rules).map(func => func()));
}

export const phasePractice1Block = createPhase1Block(phase1Practice);
export const phase1Block = createPhase1Block(phase1);
export const phase2Block = createPhase2Block(phase2, phase1Block);
export const phase3Block = createPhase3Block(phase3, phase1Block, phase2Block);

function printBlocks() {
	const re = /((Crab|Fish)\d)/;
	let trials = {};
	for (const t of phase1Block) {
		const file = t.image.match(re)[0];
		trials[file] = {
			...trials[file],
			phase1: t.rule
		};
	}
	for (const t of phase2Block) {
		const file = t.image.match(re)[0];
		trials[file] = {
			...trials[file],
			phase2: t.rule
		};
	}
	for (const t of phase3Block) {
		const file = t.image.match(re)[0];
		console.log(file, t.rule);
		trials[file] = {
			...trials[file],
			phase3: t.rule
		};
	}

	for (let [key, value] of Object.entries(trials).sort((a,b) => {
		if ('phase1' in a[1] !== 'phase1' in b[1]) {
			return 'phase1' in a[1]? -1: 1;
		}
		if ('phase2' in a[1] !== 'phase2' in b[1]) {
			return 'phase2' in a[1]? -1: 1;
		}
		if ('phase3' in a[1] !== 'phase3' in b[1]) {
			return 'phase3' in a[1]? -1: 1;
		}
		if (a[1].phase1 !== b[1].phase1) {
			return a[1].phase1 === 'Accept' ? -1 : 1;
		}
		if (a[1].phase2 !== b[1].phase2) {
			return a[1].phase2 === 'Accept' ? -1 : 1;
		}
		if (a[1].phase3 !== b[1].phase3) {
			return a[1].phase3 === 'Accept' ? -1 : 1;
		}

		return a[0] === b[0]? 0 : (a[0] < b[0]? -1 : 1);
	})) {
	  console.log(`${key}: ${value.phase1} ${value.phase2} ${value.phase3}`);
	}
}