import { createSelector } from 'reselect'
import {PHASE_FLOW, PHASE1, PHASE2, PHASE3, PHASE1_PRACTICE} from './globalconstants';
import {PAGE_FLOW as phase1PageFlow, PAGE_FLOW_BREAK} from './phase1constants';
import {PAGE_FLOW as phase2PageFlow} from './phase2constants';
import {PAGE_FLOW as phase3PageFlow} from './phase3constants';
import {PAGE_FLOW as phase1PracticePageFlow} from './phase1practiceconstants';


import {
	nextPage as phase1NextPage,
	storeKeyPress as phase1StoreKeyPress,
	storeKeyReactionTime as phase1StoreReactionTime,
} from './phase1actions';

import {
	nextPage as phase2NextPage,
	storeKeyPress as phase2StoreKeyPress,
	storeKeyReactionTime as phase2StoreReactionTime,
} from './phase2actions';

import {
	nextPage as phase3NextPage,
	storeKeyPress as phase3StoreKeyPress,
	storeKeyReactionTime as phase3StoreReactionTime,
} from './phase3actions';

import {
	nextPage as phase1PracticeNextPage,
	storeKeyPress as phase1PracticeStoreKeyPress
} from './phase1practiceactions';

const nextPageLookUp = {
  [PHASE1]: phase1NextPage,
  [PHASE2]: phase2NextPage,
  [PHASE3]: phase3NextPage,
  [PHASE1_PRACTICE]: phase1PracticeNextPage,
}

const storeKeyReactionTimeLookUp = {
  [PHASE1]: phase1StoreReactionTime,
  [PHASE2]: phase2StoreReactionTime,
  [PHASE3]: phase3StoreReactionTime,
}

const storeKeyPressLookUp = {
  [PHASE1]: phase1StoreKeyPress,
  [PHASE2]: phase2StoreKeyPress,
  [PHASE3]: phase3StoreKeyPress,
  [PHASE1_PRACTICE]: phase1PracticeStoreKeyPress,
}

const pageFlowLookup = {
	[PHASE1]: phase1PageFlow,
	[PHASE2]: phase2PageFlow,
	[PHASE3]: phase3PageFlow,
	[PHASE1_PRACTICE]: phase1PracticePageFlow,
}

const pageFlowBreakOutConditions = {
	[PHASE1]: PAGE_FLOW_BREAK
}

const getNextPageAction = (phase) => nextPageLookUp[phase];
const getStoreKeyStrokeAction = (phase) => storeKeyPressLookUp[phase];
const getStoreKeyReactionTimeAction = (phase) => storeKeyReactionTimeLookUp[phase];

const getPhaseIndex = ({global}) => global.phaseIndex;
const getPhase = createSelector(getPhaseIndex, index => PHASE_FLOW[index]);
const getState = (state) => state;
const getPageFlow = (state) => pageFlowLookup[getPhase(state)];
const getPageFlowBreak = (state) => {
	const breakOut = pageFlowBreakOutConditions[getPhase(state)];
	return breakOut? breakOut(getPhaseState(state)) : undefined;
}

const getPhaseState = createSelector(getPhase, getState, (phase, state) => state[phase]);
const getCurrentTrialIndex = (state) => getPhaseState(state).trialIndex;
const getCurrentTrialList = (state) => getPhaseState(state).trials;

const isFeedbackPage = (state) => getPhaseState(state).pageIndex === getPageFlow(state).length - 1;
const getWasCorrect = (state) => getPhaseState(state).lastKeyCorrect;
const getWasLate = (state) => getPhaseState(state).wasLate;
const getWasReject = (state) => getPhaseState(state).lastKeyReject;
const getEarnings = (state) => getPhaseState(state).earnings;

const getTrial = createSelector(getCurrentTrialIndex, getCurrentTrialList, (index, trials) => trials[index]);
const getPageIndex = state => getPhaseState(state).pageIndex;
const getPage = createSelector(getPageIndex, getPageFlow, getPageFlowBreak, (pageIndex, pageFlow, breakOutPage) => breakOutPage? breakOutPage : pageFlow[pageIndex]);

const getTrialRule = createSelector(getTrial, trial => {
	const forceMistake = trial.forceMistake;
	const rule = forceMistake? (trial.rule === 'Accept'? 'Reject':'Accept') :trial.rule;
	return rule + ' ' + trial.type;
});

const getFeedbackInfo = createSelector(getPhaseState, getCurrentTrialIndex, (state, total) => ({
	total,
	numCorrect: state.numCorrect,
	numMissed: 0
}));

const getCustomCorrectKey = createSelector(getPhaseState, getTrial, (state, trial) => {
	if (!state.keyLookUp) {
		return;
	}

	return state.keyLookUp[trial.image];
});


export default getTrial;
export {
	isFeedbackPage,
	getPhase,
	getPage,
	getNextPageAction,
	getTrialRule,
	getStoreKeyStrokeAction,
	getStoreKeyReactionTimeAction,
	getWasCorrect,
	getWasLate,
	getFeedbackInfo,
	getCustomCorrectKey,
	getEarnings,
	getWasReject
};

