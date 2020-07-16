import createPerDomainActionAndReducer from './createPerDomainActionAndReducer';
import {setResponseTime} from './dataactions';

const actionPostfix = '/storeKeyReactionTime';
const wasLateThreshold = 1000;
const handleStateChange = (state, action) => {
	return {
		...state,
		wasLate: action.reactionTime > wasLateThreshold
	};
};

const createActionPayload = (action)=> {
	return (trialIndex, keyCode, reactionTime) => {
		return (dispatch) => {
			const storeResponseTime = setResponseTime(trialIndex, reactionTime, keyCode);
			dispatch(storeResponseTime);
			dispatch({
				type: action,
				trialIndex,
				keyCode,
				reactionTime
			});
		};
	};
};

const {createReducer, getAction} = createPerDomainActionAndReducer(actionPostfix, handleStateChange, createActionPayload);

export {
	createReducer,
	getAction as getStoreReactionTimeAction
};
