import {getEarnings} from './selectors';
import getFileNameFromWebpackPath from '../webpackfilename';

const getFilenameFromPath = (path) => path.split('\\').pop().split('/').pop();

export const createTrialRow = state => {
	const {data} = state;
	const correctKey = data.correctKey;
	const forceMistake = data.currentTrial.forcedMistake;
	console.assert((correctKey === data.key) === data.wasCorrect || forceMistake,`correctKey ${correctKey} pressedKey ${data.key} wasCorrect ${data.wasCorrect}`);
	const today = new Date();
	return {
		participant: data.id,
		date: today.toISOString(),
		millis: today.getTime(),
		stimulusCategory: data.currentTrial.stimulusCategory,
		phase: data.currentPhase,
		trial: data.currentTrialIndex,
		trialTime: data.currentTrial.time,
		rule: data.currentTrial.rule,
		image: getFileNameFromWebpackPath(data.currentTrial.filePath),
		filePath: data.currentTrial.filePath,
		block: data.currentBlock.number,
		blockStartTime: data.currentBlock.startTime,
		stimulusTime: data.stimulusTime,
		correctKey: correctKey,
		pressedKey: data.key,
		reactionTime: data.reactionTime,
		correct: correctKey === data.key,
		rewardChange: data.earningsChange,
		rewardTotal: getEarnings(state)
	};
};

export const genStandardFields = state => {
	const {data} = state;
	const today = new Date();

	return {
		participant: data.id,
		date: today.toISOString(),
		millis: today.getTime(),
	};
};
