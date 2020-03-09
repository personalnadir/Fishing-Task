import {createReducer as createKeyStrokeReducer, getStoreKeyStrokeAction} from './storekeystrokeaction';
import {createReducer as createReactionTimeReducer, getStoreReactionTimeAction} from './storereactiontimeeaction';
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

export const nextPage = () => ({
	type: NEXT_PAGE
});

export const adjustEarnings = (change) => ({
	type: ADJUST_EARNINGS,
	change
});