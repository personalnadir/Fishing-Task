import {
  NEXT_PAGE,
  MARK_FEEDBACK_SHOWN,
  TEST_SHOW_FEEDBACK,
  actionReducers
} from "../phase1actions";

import {phase1Block} from '../../trialblocks';
import createTrials from '../../trials';
import {phase1} from '../../images';
import {PAGE_FLOW} from '../phase1constants.js';

const numBlocks = process.env.NODE_ENV === 'development'? 1 : 10;
const startPageIndex = 0;
const initialState = {
  trialIndex: 0,
  trialLastFeedbackShown: 0,
  numMissed: 0,
  numCorrect: 0,
  pageIndex : startPageIndex,
  trials: createTrials(phase1, numBlocks, phase1Block),
};

const trialsBetweenFeedback = 5;

export default function(state = initialState, action) {
  const {trialIndex, pageIndex: curPage} = state;
  const lastPage = curPage + 1 === PAGE_FLOW.length;

  switch (action.type) {
    case NEXT_PAGE:
      if (action.trialIndex !== state.trialIndex) {
        return state;
      }
      const nextPage = lastPage? 0: curPage + 1;
      const nextTrialIndex = lastPage && state.lastKeyCorrect? trialIndex + 1: trialIndex;

      return {
        ...state,
        pageIndex: nextPage,
        trialIndex: nextTrialIndex,
      };
    case MARK_FEEDBACK_SHOWN:
      return {
        ...state,
        showFeedback: false
      };
    case TEST_SHOW_FEEDBACK:
      const isLastTrial = trialIndex === state.trials.length - 1;
      const trialAttempts = trialIndex + state.numMistakes;
      const showFeedbackAfterTrial = trialIndex > 0 && trialAttempts - state.trialLastFeedbackShown >= trialsBetweenFeedback;
      const showFeedback = state.lastKeyCorrect && (isLastTrial || showFeedbackAfterTrial);
      const trialLastFeedbackShown = showFeedback? trialAttempts : state.trialLastFeedbackShown;

      return {
        ...state,
        showFeedback,
        trialLastFeedbackShown
      };
    default:
      return actionReducers(state, action);
  }
}
