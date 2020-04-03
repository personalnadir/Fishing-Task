import {createReducer as createKeyStrokeReducer, getStoreKeyStrokeAction} from './storekeystrokeaction';
import {createReducer as createReactionTimeReducer, getStoreReactionTimeAction} from './storereactiontimeeaction';
const DOMAIN = 'phase1';
export const NEXT_PAGE = DOMAIN + '/nextPage';
export const MARK_FEEDBACK_SHOWN = DOMAIN + '/clearShowFeedback';
export const TEST_SHOW_FEEDBACK = DOMAIN + '/testShowFeedback';

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

export const clearShowFeedback = () => ({
	type: MARK_FEEDBACK_SHOWN
});

export const testShowFeedback = () => ({
	type: TEST_SHOW_FEEDBACK
});