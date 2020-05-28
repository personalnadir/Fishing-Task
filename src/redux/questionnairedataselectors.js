import {getPage} from './selectors';
import { createSelector } from 'reselect';
import * as questionnaire from './questionnaireconstants';

export const getQuestionnaireName = state => {
	const page = getPage(state);
	switch (page) {
		case questionnaire.PAGE_GALLERY_SUBSIDY:
			return "SUBSIDY_IMAGE_SELECTION"
		case questionnaire.PAGE_GALLERY_TAX:
			return "TAX_IMAGE_SELECTION"
		case questionnaire.PAGE_KEY_SELECT_SUBSIDY:
			return "PHASE2_KEY_SELECTION_SUBSIDY";
		case questionnaire.PAGE_KEY_SELECT_TAX:
			return "PHASE2_KEY_SELECTION_TAX";
		case questionnaire.PAGE_KEY_SELECT_OUTCOME:
			return "PHASE1/3_KEY_SELECTION";
		case questionnaire.PAGE_CONFIDENCE_SUBSIDY:
			return "VAS_CONFIDENCE_SUBSIDY";
		case questionnaire.PAGE_CONFIDENCE_TAX:
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