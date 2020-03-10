import {
  NEXT_PAGE,
  keyStoreReducer
} from "../phase1practiceactions";

import {
  PAGE_FLOW,
} from '../phase1practiceconstants';

import createTrials, {forceKeys} from '../../trials';
import {phase1Practice} from '../../images';
import {phasePractice1Block} from '../../trialblocks';

const startPageIndex = 0;
const initialState = {
  trialIndex: 0,
  numMissed: 0,
  numCorrect: 0,
  pageIndex : startPageIndex,
  trials: forceKeys(createTrials(phase1Practice, 1, phasePractice1Block), 6),
};

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
        trialIndex: trialIndex,
      }
    default:
      return keyStoreReducer(state, action);
  }
}
