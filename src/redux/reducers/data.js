import {getCorrectKeyForTrial} from '../selectors';

import {
  SET_PHASE,
  SET_TRIAL,
  SET_TRIALBLOCK,
  SET_PARTICIPANT_AB,
  SET_STIMULUS_REVEAL_TIME,
  SET_RESPONSE_TIME,
  SET_RESPONSE_KEY,
  SET_LOGIN_ID,
  SEND_DATA
} from "../dataactions";

const initialState = {
  data: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_PHASE:
      return {
        ...state,
        currentPhase: action.phase
      };
    case SET_TRIAL:
      const {currentBlock} = state;
      let newBlock = currentBlock;
      if (!currentBlock || currentBlock.number !== action.block) {
        newBlock = {
          number: action.block,
          startTime: action.time
        };
      }
      return {
        ...state,
        currentTrialIndex: action.index,
        currentTrial: {
          stimulusCategory: action.stimulusCategory,
          filePath: action.filePath,
          rule: action.rule,
          time: action.time,
        },
        currentBlock: newBlock
      };
    case SET_RESPONSE_TIME:
      return {
        ...state,
        key: action.keyCode,
        reactionTime: action.rt,
      };
    case SET_RESPONSE_KEY: {
      return {
        ...state,
        key: action.keyCode,
        wasCorrect: action.wasCorrect,
        correctKey: action.correctKey
      };
    }
    case SET_STIMULUS_REVEAL_TIME:
      return {
        ...state,
        stimulusTime: action.time
      };
    case SEND_DATA:
      return {
        ...state,
        lastSentTrialData: action.trialIndex,
        currentTrialIndex: null,
      };
    case SET_LOGIN_ID:
      return {
        ...state,
        id: action.id
      };
    default:
      return state;
  }
}
