import watch from 'redux-watch';
import store from './store';
import getTrial, {
	getPhase,
	getCurrentTrialIndex,
	collectTrialDataDuringPhase
} from './selectors';
import {PHASE1} from './globalconstants';
import {setPhase, setTrial, submitRowOfData} from './dataactions';

let watchTrialIndex = watch(() => {
	const state = store.getState();
	if (!collectTrialDataDuringPhase(state)) {
		return null;
	}
	return getCurrentTrialIndex(state);
});

store.subscribe(watchTrialIndex((newVal, oldVal) => {
	const state = store.getState();
	if (newVal === null) {
		store.dispatch(submitRowOfData());
		return;
	}
	const trial = getTrial(state);
	if (!trial) {
		return;
	}
	if (oldVal === null) {
		store.dispatch(setTrial(getCurrentTrialIndex(state), trial, Date.now()));
		return;
	}
	store.dispatch(submitRowOfData());
	store.dispatch(setTrial(getCurrentTrialIndex(state), trial, Date.now()));
}));

let watchPhase = watch(() => getPhase(store.getState()));

store.subscribe(watchPhase((newVal, oldVal) => {
	store.dispatch(setPhase(newVal));
}));

let watchForceSubmitDataSubmit = watch(() => {
	const state = store.getState();
	if (!collectTrialDataDuringPhase(state) || getPhase(state) !== PHASE1) {
		return null;
	}
	return state[PHASE1].forceDataSubmit;
});

store.subscribe(watchForceSubmitDataSubmit((newVal, oldVal) => {
	if (newVal && !oldVal) {
		store.dispatch(submitRowOfData());
	}
}));
