import {
  NEXT_PAGE,
  actionReducers
} from "../phase3actions";

import createTrials, {forceKeys} from '../../trials';
import {phase3} from '../../images';
import {PAGE_FLOW} from '../phase3constants.js';

const startPageIndex = 0;
const initialState = {
  trialIndex: 0,
  numMissed: 0,
  numCorrect: 0,
  pageIndex : startPageIndex,
  trials: createTrials(phase1, 10, 3, 3, 3, 3, ['Accept', 'Reject', 'Free']),
};

const trialsBetweenFeedback = 5;

export default function(state = initialState, action) {
  switch (action.type) {
    case NEXT_PAGE:
      const {pageIndex: curPage} = state;
      const lastPage = curPage + 1 === PAGE_FLOW.length;
      const nextPage = lastPage? 0: curPage + 1;
      const trialIndex = lastPage? state.trialIndex + 1: state.trialIndex;

      return {
        ...state,
        pageIndex: nextPage,
        trialIndex,
      };
    default:
      return actionReducers(state, action);
  }
}
