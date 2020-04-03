import {createReducer as createKeyStrokeReducer, getStoreKeyStrokeAction} from './storekeystrokeaction';
import {createReducer as createReactionTimeReducer, getStoreReactionTimeAction} from './storereactiontimeeaction';
const DOMAIN = 'phase3';
export const NEXT_PAGE = DOMAIN + '/nextPage';
export const SET_KEYPRESS_TRIALINDEX = DOMAIN + '/setTrialIndex';

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

export const setKeyPressTrialIndex = trialIndex => ({
	type: SET_KEYPRESS_TRIALINDEX,
	trialIndex
});
