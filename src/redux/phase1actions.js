import {createReducer as createKeyStrokeReducer, getStoreKeyStrokeAction} from './storekeystrokeaction';
import {createReducer as createReactionTimeReducer, getStoreReactionTimeAction} from './storereactiontimeeaction';
const DOMAIN = 'phase1';
export const NEXT_PAGE = DOMAIN + '/nextPage';
export const MARK_FEEDBACK_SHOWN = DOMAIN + '/clearShowFeedback';

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

export const clearShowFeedback = () => ({
	type: MARK_FEEDBACK_SHOWN
});