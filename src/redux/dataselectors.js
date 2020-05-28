import {getCorrectKeyForTrial} from './selectors';
import { createSelector } from 'reselect';

const getFilenameFromPath = (path) => path.split('\\').pop().split('/').pop();

export const createTrialRow = state => {
	const {data} = state;
	const correctKey = getCorrectKeyForTrial(state);
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
		image: getFilenameFromPath(data.currentTrial.filePath),
		filePath: data.currentTrial.filePath,
		block: data.currentBlock.number,
		blockStartTime: data.currentBlock.startTime,
		stimulusTime: data.stimulusTime,
		correctKey: correctKey,
		pressedKey: data.key,
		reactionTime: data.reactionTime,
		correct: correctKey === data.key
	};
};