import createPerDomainActionAndReducer from './createPerDomainActionAndReducer';
import {setResponseKey} from './dataactions';
import {getCurrentTrialIndex, getCorrectKeyForTrial} from './selectors';

const actionPostfix = '/storeKeystroke';
const handleStateChange = (state, action) => {
	const curCorrect = state.numCorrect || 0;
	const curMistakes = state.numMistakes || 0;

	return {
		...state,
		numCorrect: action.correct? curCorrect + 1: curCorrect,
		numMistakes: !action.correct? curMistakes + 1: curMistakes,
		lastKeyCorrect: action.correct,
		lastKeyReject: action.wasReject
	};
};

const createActionPayload = (action)=> {
	return (keyCode, correct, correctKey, wasReject) => {
		return (dispatch, getState) => {
			const correctKey = getCorrectKeyForTrial(getState());
			const t = getCurrentTrialIndex(getState());
			dispatch(setResponseKey(t, keyCode, correctKey, correct));
			dispatch({
				type: action,
				keyCode,
				correct,
				wasReject
			});
		};
	};
};

const {createReducer, getAction} = createPerDomainActionAndReducer(actionPostfix, handleStateChange, createActionPayload);

export {
	createReducer,
	getAction as getStoreKeyStrokeAction
};
