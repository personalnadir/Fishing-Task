import {
  NEXT_PAGE,
  MARK_FEEDBACK_SHOWN,
  actionReducers
} from "../phase1actions";

import {phase1Block} from '../../trialblocks';
import createTrials from '../../trials';
import {phase1} from '../../images';
import {PAGE_FLOW} from '../phase1constants.js';

const startPageIndex = 0;
const initialState = {
  trialIndex: 0,
  numMissed: 0,
  numCorrect: 0,
  pageIndex : startPageIndex,
  trials: createTrials(phase1, 10, phase1Block),
};

const trialsBetweenFeedback = 5;

export default function(state = initialState, action) {
  switch (action.type) {
    case NEXT_PAGE:
      const {pageIndex: curPage} = state;
      const lastPage = curPage + 1 === PAGE_FLOW.length;
      const nextPage = lastPage? 0: curPage + 1;
      const trialIndex = lastPage && state.lastKeyCorrect? state.trialIndex + 1: state.trialIndex;
      const showFeedback = lastPage && trialIndex > 0 && trialIndex % trialsBetweenFeedback === 0;

      return {
        ...state,
        pageIndex: nextPage,
        trialIndex,
        showFeedback,
      };
    case MARK_FEEDBACK_SHOWN:
      return {
        ...state,
        showFeedback: false
      };
    default:
      return actionReducers(state, action);
  }
}
