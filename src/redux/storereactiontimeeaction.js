import createPerDomainActionAndReducer from './createPerDomainActionAndReducer';

const actionPostfix = '/storeKeyReactionTime';
const wasLateThreshold = 1000;
const handleStateChange = (state, action) => {
	return {
		...state,
		wasLate: action.reactionTime > wasLateThreshold
	};
}

const createActionPayload = (action)=> {
	return (keyCode, reactionTime) => ({
		type: action,
		keyCode,
		reactionTime
	});
}

const {createReducer, getAction} = createPerDomainActionAndReducer(actionPostfix, handleStateChange, createActionPayload);

export {
	createReducer,
	getAction as getStoreReactionTimeAction
};
