import {QUESTIONNAIRE} from './globalconstants';
import {getPage} from './selectors';
import * as questionniare from './questionnaireconstants';
import {PAGE_FLOW} from './questionnaireconstants';

const getQuestionnaireState = state => state[QUESTIONNAIRE];

export const changeQuestionnairePage = state => {
	const qs = getQuestionnaireState(state);
	const page = getPage(state);
	switch (page) {
		case questionniare.PAGE_KEY_SELECT_TAX:
			return qs.imageIndex === qs.taxImages.length - 1;
		case questionniare.PAGE_KEY_SELECT_SUBSIDY:
			return qs.imageIndex === qs.subsidyImages.length - 1;
		case questionniare.PAGE_KEY_SELECT_OUTCOME:
			return qs.imageIndex === qs.keySelectionImages.length - 1;
		default:
			return false;
	}
};

export const getQuestionnaireTrialBlock = (state) => {
	const qs = getQuestionnaireState(state);
	const page = getPage(state);
	switch (page) {
		case questionniare.PAGE_KEY_SELECT_TAX:
			return qs.taxImages[qs.imageIndex];
		case questionniare.PAGE_KEY_SELECT_SUBSIDY:
			return qs.subsidyImages[qs.imageIndex];
		case questionniare.PAGE_KEY_SELECT_OUTCOME:
			return qs.keySelectionImages[qs.imageIndex];
		default:
			return false;
	}
};

export const questionnairesCompleted = (state) => {
	const qs = getQuestionnaireState(state);
	return qs.pageIndex === PAGE_FLOW.length - 1;
};