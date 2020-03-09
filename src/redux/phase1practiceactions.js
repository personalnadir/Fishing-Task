import {createReducer, getStoreKeyStrokeAction} from './storekeystrokeaction'
const DOMAIN = 'phase1Practice';
export const NEXT_PAGE = DOMAIN + '/nextPage';

export const keyStoreReducer = createReducer(DOMAIN);
export const storeKeyPress = getStoreKeyStrokeAction(DOMAIN);

export const nextPage = () => ({
	type: NEXT_PAGE
});