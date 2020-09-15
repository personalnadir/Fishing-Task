import {getKeysSelected} from './questionnairedataselectors';
import {genStandardFields} from './dataselectors';
import submitData from '../senddata';
import getFileNameFromWebpackPath from '../webpackfilename';

export const SET_ANIMALS = 'questionnairedata/setGalleryAnimals';
export const SET_KEY_SELECTED = 'questionnairedata/setCorrectKeySelection';
export const CLEAR_KEYS_SELECTED = 'questionnairedata/clearKeysSelected';
export const SEND_KEYS_SELECTED = 'questionnairedata/sendKeysSelected';
export const SET_VAS = 'questionnairedata/setVAS';
export const SEND_DATA = 'questionnairedata/sendData';

const getFilenameFromPath = (path) => path.split('\\').pop().split('/').pop();


export const sendGalleryAnimals = (questionnaire, userSelected, correct) => {
	return (dispatch, getState) => {
		const extractFilePaths = imgs => imgs.map(v => getFileNameFromWebpackPath(v.image));
		const standardFields = genStandardFields(getState());
		const row = {
			...standardFields,
			questionnaire,
			imagesSelected: extractFilePaths(userSelected),
			correctImages: extractFilePaths(correct)
		};
		submitData('imageSelection', row);
		return {...row, type: SET_ANIMALS};
	};
};

export const setKeySelected = (questionnaire, imagePath, keySelected, correct) => ({
	type: SET_KEY_SELECTED,
	questionnaire,
	image: getFileNameFromWebpackPath(imagePath),
	userSelectedKey: keySelected,
	correctKey: correct
});

export const sendKeySelected = () => {
	return (dispatch, getState) => {
		const state = getState();
		const data = getKeysSelected(state);
		const standardFields = genStandardFields(state);
		submitData('keySelection', data.map(v => Object.assign(v, standardFields)));
		dispatch({
			type:CLEAR_KEYS_SELECTED
		});
	};
};

export const sendVAS = (questionnaire, value) => {
	return (dispatch, getState) => {
		const state = getState();
		const standardFields = genStandardFields(state);

		const row = {
			...standardFields,
			questionnaire,
			value
		};
		submitData('vas', row);

		return {...row, type: SET_VAS};
	};
};

const setDataSent = (trialIndex) => ({
	type: SEND_DATA,
	trialIndex
});
