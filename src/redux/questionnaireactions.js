import {changeQuestionnairePage, questionnairesCompleted} from './questionnaireselectors';
import {sendKeySelected} from './questionnairedataactions';
import {nextPhase} from './globalactions';
import {getPage} from './selectors';
import * as questionnaire from './questionnaireconstants';

const DOMAIN = 'questionnaires';
export const NEXT_PAGE = DOMAIN + '/nextPage';

export const nextPage = () => ({
	type: NEXT_PAGE
});

export const NEXT_TRIALBLOCK = DOMAIN + '/nextTrialBlock';

export const nextTrialBlock = () => {
	return (dispatch, getState) => {
		const state = getState();
		if (changeQuestionnairePage(state)) {
			const page = getPage(state);
			switch (page) {
				case questionnaire.PAGE_KEY_SELECT_SUBSIDY:
				case questionnaire.PAGE_KEY_SELECT_TAX:
				case questionnaire.PAGE_KEY_SELECT_OUTCOME:
					dispatch(sendKeySelected());
					break;
				default:
					break;
			}

			if (questionnairesCompleted(state)) {
				dispatch(nextPhase());
				return;
			}
			dispatch (nextPage());
			return;
		}
		dispatch({
			type: NEXT_TRIALBLOCK
		});
	};
};



