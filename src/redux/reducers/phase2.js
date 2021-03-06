import {
  NEXT_PAGE,
  ADJUST_EARNINGS,
  actionReducers,
} from "../phase2actions";

import createTrials, {mapImagePathsToKeys} from '../../trials';
import {phase2Block} from '../../trialblocks';
import {phase2} from '../../images';
import {PAGE_FLOW} from '../phase2constants.js';

const numBlocks = process.env.NODE_ENV === 'development'? 1 : 10;
const startPageIndex = 0;
const initialState = {
  trialIndex: 0,
  numMissed: 0,
  numCorrect: 0,
  pageIndex : startPageIndex,
  trials: createTrials(phase2, numBlocks, phase2Block),
  keyLookUp: mapImagePathsToKeys(phase2),
  earnings: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case NEXT_PAGE:
      if (action.trialIndex !== state.trialIndex) {
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
    case ADJUST_EARNINGS:
      return {
        ...state,
        earnings: state.earnings + action.change
      }
    default:
      return actionReducers(state, action);
  }
}
