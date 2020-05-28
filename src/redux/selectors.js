import { createSelector } from 'reselect'
import {
	PHASE_FLOW,
	PHASE1_INSTRUCTIONS,
	PHASE1_PRACTICE,
	PHASE1,
	PHASE2_PRACTICE,
	PHASE2,
	PHASE3,
	QUESTIONNAIRE,
	RULE_TO_KEY
} from './globalconstants';
import {PAGE_FLOW as phase1PageFlow, PAGE_FLOW_BREAK} from './phase1constants';
import {PAGE_FLOW as phase2PageFlow, APPROACH_REWARDS, AVOIDANCE_REWARDS} from './phase2constants';
import {PAGE_FLOW as phase3PageFlow} from './phase3constants';
import {PAGE_FLOW as phase1PracticePageFlow} from './phase1practiceconstants';
import {PAGE_FLOW as questionnairePageFlow} from './questionnaireconstants';

const pageFlowLookup = {
	[PHASE1]: phase1PageFlow,
	[PHASE2]: phase2PageFlow,
	[PHASE2_PRACTICE]: phase2PageFlow,
	[PHASE3]: phase3PageFlow,
	[PHASE1_PRACTICE]: phase1PracticePageFlow,
	[QUESTIONNAIRE]: questionnairePageFlow,
}

const pageFlowBreakOutConditions = {
	[PHASE1]: PAGE_FLOW_BREAK
}

const collectTrialDataDuring = {
	[PHASE1]: true,
	[PHASE2]: true,
	[PHASE2_PRACTICE]: true,
	[PHASE3]: true,
	[PHASE1_PRACTICE]: true,
};

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
const getEarnings = (state) => state[PHASE2].earnings;
const getAcceptColour = state => state.global.acceptColour;

const getTrial = createSelector(getCurrentTrialIndex, getCurrentTrialList, (index, trials) => Number.isInteger(index) ? trials[index]: null);
const getReward = createSelector(getTrial, getWasCorrect, getWasLate, (trial, correct, late)=> {
	const rewardLookUp = trial.rule === 'Tax' ? AVOIDANCE_REWARDS: APPROACH_REWARDS;

	let reward;
	if (correct) {
		reward = rewardLookUp['correct'];
	} else {
		reward = rewardLookUp['incorrect'];
	}
	if (typeof reward === 'object') {
		reward = reward[late? "late" : 'timely'];
	}
	return reward;
});

const getInstructionPage = (state) => state[PHASE1_INSTRUCTIONS].page;

const getPageIndex = state => getPhaseState(state).pageIndex;
const getPage = createSelector(getPageIndex, getPageFlow, getPageFlowBreak, (pageIndex, pageFlow, breakOutPage) => breakOutPage? breakOutPage : pageFlow[pageIndex]);
const isLastTrial = createSelector(getCurrentTrialIndex, getCurrentTrialList, (index, trials) => trials && index >= trials.length - 1);
const isLastPage = createSelector(getPhase, getPageIndex, getPageFlow, (phase, pageIndex, pageFlow) => {
	let offset = 1;
	if (phase === PHASE3) {
		offset = 2;
	}
	return pageIndex + offset >= pageFlow.length
});

const getTrialRule = createSelector(getTrial, trial => {
	const forceMistake = trial.forceMistake;
	const rule = forceMistake? (trial.rule === 'Accept'? 'Reject':'Accept') :trial.rule;
	return rule + ' ' + trial.type;
});

const getFeedbackInfo = createSelector(getPhaseState, getCurrentTrialIndex, (state, total) => ({
	total:(total + state.numMistakes),
	numCorrect: state.numCorrect,
	numMissed: 0,
	numMistakes: state.numMistakes
}));

const getTrialRepeated = createSelector(getPhase, getWasCorrect, (phase, correct) => phase === PHASE1 && !correct);


const getTrialsCompleted = createSelector(getPhase, getPhaseState, getCurrentTrialIndex, (phase, state, total) => {
	if (phase !== PHASE1) {
		return total;
	}
	return total + state.numMistakes;
});

const getCustomCorrectKey = createSelector(getPhaseState, getTrial, (state, trial) => {
	if (!state.keyLookUp) {
		return;
	}

	return state.keyLookUp[trial.image];
});

const getCorrectKeyForTrial = createSelector(getPhaseState, getTrial, getAcceptColour, getTrialRule, (state, trial, acceptColour, rule) => {
	if (!state.keyLookUp) {
		return RULE_TO_KEY[acceptColour][rule];
	}

	return state.keyLookUp[trial.image];
})

const showPhase1FeedBack = phaseState => phaseState.showFeedback;

const canProgressToNextPhase = createSelector(getPhase, showPhase1FeedBack, getWasCorrect, (phase, showingFeedback, wasCorrect) => {
	if (phase !== PHASE1) {
		return true;
	}

	return wasCorrect && !showingFeedback;
});

const userInputForLastTrial = createSelector(getPhaseState, getCurrentTrialIndex, (state, trialIndex) => state.lastKeyPressOnTrial === trialIndex - 1);

const collectTrialDataDuringPhase = createSelector(getPhase, phase => collectTrialDataDuring[phase]);

export default getTrial;
export {
	canProgressToNextPhase,
	getAcceptColour,
	getCorrectKeyForTrial,
	getCurrentTrialIndex,
	getEarnings,
	getFeedbackInfo,
	getInstructionPage,
	getPage,
	getPhase,
	getReward,
	getTrialRepeated,
	getTrialRule,
	getTrialsCompleted,
	getWasCorrect,
	getWasLate,
	getWasReject,
	isFeedbackPage,
	isLastPage,
	isLastTrial,
	collectTrialDataDuringPhase,
	userInputForLastTrial,
};

