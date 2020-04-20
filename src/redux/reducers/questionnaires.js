import {
  NEXT_PAGE,
  NEXT_TRIALBLOCK
} from "../questionnaireactions";

import {phase2Block, phase3Block} from '../../trialblocks';

const initialState = {
  pageIndex: 0,
  imageIndex: 0,
  taxSubsidyImages: phase2Block,
  taxImages: phase2Block.filter(trial => trial.rule === 'Tax'),
  subsidyImages: phase2Block.filter(trial => trial.rule === 'Subsidy'),
  keySelectionImages: phase3Block.filter(trial => trial.rule !== 'FreeChoice')
};

export default function(state = initialState, action) {
  switch (action.type) {
    case NEXT_PAGE:
      return {
        ...state,
        imageIndex: 0,
        pageIndex: state.pageIndex + 1,
      };
    case NEXT_TRIALBLOCK:
      return {
        ...state,
        imageIndex: state.imageIndex +1
      };
    default:
      return state;
  }
}
