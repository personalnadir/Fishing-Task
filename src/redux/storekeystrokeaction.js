import createPerDomainActionAndReducer from './createPerDomainActionAndReducer';

const actionPostfix = '/storeKeystroke';
const handleStateChange = (state, action) => {
	const curCorrect = state.numCorrect || 0;
	return {
		...state,
		numCorrect: action.correct? curCorrect + 1: curCorrect,
		lastKeyCorrect: action.correct,
		lastKeyReject: action.wasReject
	};
}

const createActionPayload = (action)=> {
	return (keyCode, correct, wasReject) => ({
		type: action,
		keyCode,
		correct,
		wasReject
	});
}

const {createReducer, getAction} = createPerDomainActionAndReducer(actionPostfix, handleStateChange, createActionPayload);

export {
	createReducer,
	getAction as getStoreKeyStrokeAction
};
