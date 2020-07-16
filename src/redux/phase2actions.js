import {createReducer as createKeyStrokeReducer, getStoreKeyStrokeAction} from './storekeystrokeaction';
import {createReducer as createReactionTimeReducer, getStoreReactionTimeAction} from './storereactiontimeeaction';
import {setEarningsChange} from './dataactions';
import {getReward} from './selectors';
const DOMAIN = 'phase2';
export const NEXT_PAGE = DOMAIN + '/nextPage';
export const ADJUST_EARNINGS = DOMAIN + '/adjustEarnings';

const keyStoreReducer = createKeyStrokeReducer(DOMAIN);
const keyReactionTimeReducer = createReactionTimeReducer(DOMAIN);

export const actionReducers = (state, action) => {
	state = keyStoreReducer(state, action);
	return keyReactionTimeReducer(state, action);
}

export const storeKeyPress = getStoreKeyStrokeAction(DOMAIN);
export const storeKeyReactionTime = getStoreReactionTimeAction(DOMAIN);

export const nextPage = (trialIndex) => ({
	type: NEXT_PAGE,
	trialIndex
});

export const adjustEarnings = (change) => ({
	type: ADJUST_EARNINGS,
	change
});

export const updateEarnings = () => {
	return (dispatch, getState) => {
		const reward = getReward(getState());
		dispatch(adjustEarnings(reward));
		dispatch(setEarningsChange(reward));
	}
};