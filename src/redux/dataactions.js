import {createTrialRow} from './dataselectors';
import submitData from '../senddata';

export const SET_PHASE = 'data/setPhase';
export const SET_TRIAL = 'data/setTrial';
export const SET_PARTICIPANT_AB = 'data/setParticipantAb';
export const SET_STIMULUS_REVEAL_TIME = 'data/setStimulusRevealTime';
export const SET_RESPONSE_TIME = 'data/setResponseTime';
export const SET_RESPONSE_KEY = 'data/setResponseKey';
export const SET_LOGIN_ID = 'data/setLoginID';
export const SET_EARNINGS_CHANGE = 'data/storeEarningsChange';
export const SEND_DATA = 'data/sendData';

export const setPhase = (phase) => ({
	type: SET_PHASE,
	phase
});

export const setTrial = (trialIndex, trial, time) => ({
	type: SET_TRIAL,
	index: trialIndex,
	stimulusCategory: trial.type,
	filePath: trial.image,
	rule: trial.rule,
	block: trial.block,
	time
});

export const setResponseTime = (trialIndex, rt, keyCode) => ({
	type: SET_RESPONSE_TIME,
	rt,
	trialIndex,
	keyCode
});

export const setResponseKey = (trialIndex, pressedKey, correctKey, correct) => ({
	type: SET_RESPONSE_KEY,
	keyCode: pressedKey,
	wasCorrect: correct,
	correctKey
});

export const setParticipantAb = (ab) => ({
	type: SET_PARTICIPANT_AB,
	ab
});

export const setStimulusRevealed = (trialIndex, time) => ({
	type: SET_STIMULUS_REVEAL_TIME,
	time,
	trialIndex
});


export const setEarningsChange = (amount) => ({
	type: SET_EARNINGS_CHANGE,
	amount
});

export const setLoginID = id => ({
	type: SET_LOGIN_ID,
	id
});

const setDataSent = (trialIndex) => ({
	type: SEND_DATA,
	trialIndex
});

export const submitRowOfData = () => {
	return (dispatch, getState) => {
		const row = createTrialRow(getState());
		submitData(row);
		dispatch(setDataSent(row.trial));
	};
};