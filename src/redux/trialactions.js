import {
	isLastTrial,
	isLastPage,
	canProgressToNextPhase
} from './selectors';
import {getNextPageAction} from './phaseactions';
import { nextPhase } from './globalactions';

export function progressThroughCurrentTrial(phase, trialIndex) {
	return (dispatch, getState) =>{
		const state = getState();
		if (isLastTrial(state) && isLastPage(state) && canProgressToNextPhase(state)) {
			return dispatch(nextPhase());
		}
		return dispatch(getNextPageAction(phase)(trialIndex));
	}
}