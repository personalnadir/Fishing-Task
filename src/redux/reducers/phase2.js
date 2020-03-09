import {
  NEXT_PAGE,
  ADJUST_EARNINGS,
  actionReducers,
} from "../phase2actions";

import createTrials, {forceKeys, mapImagePathsToKeys} from '../../trials';
import {phase2} from '../../images';
import {PAGE_FLOW} from '../phase2constants.js';

const startPageIndex = 0;
const initialState = {
  trialIndex: 0,
  numMissed: 0,
  numCorrect: 0,
  pageIndex : startPageIndex,
  trials: createTrials(phase2, 10, 3, 3, 3, 3, ['Subsidy', 'Tax']),
  keyLookUp: mapImagePathsToKeys(phase2),
  earnings: 0
};

const trialsBetweenFeedback = 5;

export default function(state = initialState, action) {
  switch (action.type) {
    case NEXT_PAGE:
      const {pageIndex: curPage} = state;
      const lastPage = curPage + 1 === PAGE_FLOW.length;
      const nextPage = lastPage? 0: curPage + 1;
      const trialIndex = lastPage? state.trialIndex + 1: state.trialIndex;
      const showFeedback = lastPage && trialIndex % trialsBetweenFeedback === 0;

      return {
        ...state,
        pageIndex: nextPage,
        trialIndex,
        showFeedback,
      };
    case ADJUST_EARNINGS:
      return {
        ...state,
        earnings: state.earnings + action.change
      }
    default:
      return actionReducers(state, action);
  }
}
