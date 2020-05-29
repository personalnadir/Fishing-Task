import {getKeysSelected} from './questionnairedataselectors';
import submitData from '../senddata';

export const SET_ANIMALS = 'questionnairedata/setGalleryAnimals';
export const SET_KEY_SELECTED = 'questionnairedata/setCorrectKeySelection';
export const CLEAR_KEYS_SELECTED = 'questionnairedata/clearKeysSelected';
export const SEND_KEYS_SELECTED = 'questionnairedata/sendKeysSelected';
export const SET_VAS = 'questionnairedata/setVAS';
export const SEND_DATA = 'questionnairedata/sendData';

const getFilenameFromPath = (path) => path.split('\\').pop().split('/').pop();

export const sendGalleryAnimals = (questionnaire, userSelected, correct) => {
	const extractFilePaths = imgs => imgs.map(v => getFilenameFromPath(v.image));
	const row = {
		questionnaire,
		imagesSelected: extractFilePaths(userSelected),
		correctImages: extractFilePaths(correct)
	};
	submitData(row);
	return {...row, type: SET_ANIMALS};
};

export const setKeySelected = (questionnaire, keySelected, correct) => ({
	type: SET_KEY_SELECTED,
	questionnaire,
	userSelectedKey: keySelected,
	correctKey: correct
});

export const sendKeySelected = () => {
	return (dispatch, getState) => {
		const state = getState();
		submitData(getKeysSelected(state));
		dispatch({
			type:CLEAR_KEYS_SELECTED
		});
	};
};

export const sendVAS = (questionnaire, value) => {
	const row = {
		questionnaire,
		value
	};
	submitData(row);

	return {...row, type: SET_VAS};
};

const setDataSent = (trialIndex) => ({
	type: SEND_DATA,
	trialIndex
});
