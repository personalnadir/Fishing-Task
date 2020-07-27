import {
	PHASE1_PRACTICE,
	PHASE1,
	PHASE2_PRACTICE,
	PHASE2,
	PHASE3,
} from './globalconstants';

import {
	nextPage as phase1NextPage,
	storeKeyPress as phase1StoreKeyPress,
	storeKeyReactionTime as phase1StoreReactionTime,
	testShowFeedback as phase1TestShowFeedback
} from './phase1actions';

import {
	nextPage as phase2PracticeNextPage,
	storeKeyPress as phase2PracticeStoreKeyPress,
	storeKeyReactionTime as phase2PracticeStoreReactionTime,
	updateEarnings as phase2PracticeUpdateEarnings,
} from './phase2practiceactions';

import {
	nextPage as phase2NextPage,
	storeKeyPress as phase2StoreKeyPress,
	storeKeyReactionTime as phase2StoreReactionTime,
	updateEarnings as phase2UpdateEarnings
} from './phase2actions';

import {
	nextPage as phase3NextPage,
	storeKeyPress as phase3StoreKeyPress,
	storeKeyReactionTime as phase3StoreReactionTime,
	setKeyPressTrialIndex
} from './phase3actions';

import {
	nextPage as phase1PracticeNextPage,
	storeKeyPress as phase1PracticeStoreKeyPress,
	storeKeyReactionTime as phase1PracticeStoreReactionTime,
} from './phase1practiceactions';

const nextPageLookUp = {
  [PHASE1]: phase1NextPage,
  [PHASE2]: phase2NextPage,
  [PHASE3]: phase3NextPage,
  [PHASE1_PRACTICE]: phase1PracticeNextPage,
  [PHASE2_PRACTICE]: phase2PracticeNextPage,
};

const storeKeyReactionTimeLookUp = {
  [PHASE1]: phase1StoreReactionTime,
  [PHASE2]: phase2StoreReactionTime,
  [PHASE3]: phase3StoreReactionTime,
  [PHASE1_PRACTICE]: phase1PracticeStoreReactionTime,
  [PHASE2_PRACTICE]: phase2PracticeStoreReactionTime
};

const storeKeyPressLookUp = {
  [PHASE1]: phase1StoreKeyPress,
  [PHASE2]: phase2StoreKeyPress,
  [PHASE3]: phase3StoreKeyPress,
  [PHASE1_PRACTICE]: phase1PracticeStoreKeyPress,
  [PHASE2_PRACTICE]: phase2PracticeStoreKeyPress,
};

const keyStrokeLogic = {
	[PHASE1]: phase1TestShowFeedback,
	[PHASE2_PRACTICE]: phase2PracticeUpdateEarnings,
	[PHASE2]: phase2UpdateEarnings,
	[PHASE3]: setKeyPressTrialIndex
};

const getNextPageAction = (phase) => nextPageLookUp[phase];
const getStoreKeyStrokeAction = (phase) => storeKeyPressLookUp[phase];
const getStoreKeyReactionTimeAction = (phase) => storeKeyReactionTimeLookUp[phase];
const getHandleKeyStroke = (phase) => keyStrokeLogic[phase];

export {
	getNextPageAction,
	getStoreKeyStrokeAction,
	getStoreKeyReactionTimeAction,
	getHandleKeyStroke
};