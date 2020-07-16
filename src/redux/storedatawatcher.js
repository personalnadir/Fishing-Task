import watch from 'redux-watch';
import store from './store';
import getTrial, {
	getPhase,
	getCurrentTrialIndex,
	getTrialRepeated,
	collectTrialDataDuringPhase
} from './selectors';
import {setPhase, setTrialBlockStart, setTrial, submitRowOfData} from './dataactions';

let watchTrialIndex = watch(() => {
	const state = store.getState();
	if (!collectTrialDataDuringPhase(state)) {
		return null;
	}
	const phase = getPhase(state);

	return getCurrentTrialIndex(state);
});

store.subscribe(watchTrialIndex((newVal, oldVal) => {
	const state = store.getState();
	if (newVal === null || oldVal == null) {
		return;
	}
	const trial = getTrial(state);
	if (!trial) {
		return;
	}
	store.dispatch(setTrial(getCurrentTrialIndex(state), trial, Date.now()));
	store.dispatch(submitRowOfData());
}));

let watchPhase = watch(() => getPhase(store.getState()));

store.subscribe(watchPhase((newVal, oldVal) => {
	const state = store.getState();
	store.dispatch(setPhase(newVal));
}));
