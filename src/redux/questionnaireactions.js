import {changeQuestionnairePage, questionnairesCompleted} from './questionnaireselectors';
import {nextPhase} from './globalactions';

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
	}
};



