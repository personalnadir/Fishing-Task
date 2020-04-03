import {
  NEXT_PAGE,
  SET_KEYPRESS_TRIALINDEX,
  actionReducers
} from "../phase3actions";
import {phase3Block} from '../../trialblocks';
import createTrials, {forceKeys} from '../../trials';
import {phase3} from '../../images';
import {PAGE_FLOW} from '../phase3constants.js';

const numBlocks = process.env.NODE_ENV === 'development'? 1 : 10;
const startPageIndex = 0;
const initialState = {
  trialIndex: 0,
  numMissed: 0,
  numCorrect: 0,
  pageIndex : startPageIndex,
  trials: createTrials(phase3, numBlocks, phase3Block)
};

export default function(state = initialState, action) {
  switch (action.type) {
    case NEXT_PAGE:
      if (action.trialIndex !== state.trialIndex) {
        return state;
      }
      const {pageIndex: curPage, trialIndex, lastKeyPressOnTrial } = state;
      const timedOut = curPage === 1 && trialIndex !== lastKeyPressOnTrial;

      const lastPage = curPage + 1 === PAGE_FLOW.length;
      const nextPage = (lastPage || timedOut) ? 0: curPage + 1;
      const nextTrialIndex = (lastPage || timedOut) ? trialIndex + 1: trialIndex;

      return {
        ...state,
        pageIndex: nextPage,
        trialIndex: nextTrialIndex,
      };
    case SET_KEYPRESS_TRIALINDEX:
      return {
        ...state,
        lastKeyPressOnTrial: action.trialIndex
      };
    default:
      return actionReducers(state, action);
  }
}
