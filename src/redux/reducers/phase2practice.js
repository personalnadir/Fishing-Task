import {
  NEXT_PAGE,
  actionReducers
} from "../phase2practiceactions";

import {
  PAGE_FLOW,
} from '../phase2constants';

import createTrials from '../../trials';
import {phase2Practice} from '../../images';
import {phase2PracticeBlock} from '../../trialblocks';

const startPageIndex = 0;
const initialState = {
  trialIndex: 0,
  numMissed: 0,
  numCorrect: 0,
  pageIndex : startPageIndex,
  trials: createTrials(phase2Practice, 1, phase2PracticeBlock),
};

export default function(state = initialState, action) {
  switch (action.type) {
    case NEXT_PAGE:
      if (action.trialIndex !== state.trialIndex) {
        console.log(`${action.trialIndex} !== ${state.trialIndex}`);
        return state;
      }
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
