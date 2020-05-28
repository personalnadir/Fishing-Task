import {getPage} from './selectors';
import { createSelector } from 'reselect';

export const getQuestionnaireName = state => {
	const {page} = getPage(state);
	switch (page) {
		case questionniare.PAGE_GALLERY_SUBSIDY:
			return "SUBSIDY_IMAGE_SELECTION"
		case questionniare.PAGE_GALLERY_TAX:
			return "TAX_IMAGE_SELECTION"
		case questionniare.PAGE_KEY_SELECT_SUBSIDY:
			return "PHASE2_KEY_SELECTION_SUBSIDY";
		case questionniare.PAGE_KEY_SELECT_TAX:
			return "PHASE2_KEY_SELECTION_TAX";
		case questionniare.PAGE_KEY_SELECT_OUTCOME:
			return "PHASE1/3_KEY_SELECTION";
		case questionniare.PAGE_CONFIDENCE_SUBSIDY:
			return "VAS_CONFIDENCE_SUBSIDY";
		case questionniare.PAGE_CONFIDENCE_TAX:
			return "VAS_CONFIDENCE_TAX";
		default:
			console.log(`Questionnairedataselector: unrecognised questionnaire page ${page}`);
			return null;
	}
};

export const getKeysSelected = state => {
	const {questionnairedata} = state;
	return questionnairedata.keysSelected;
};