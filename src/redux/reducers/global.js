import {
  NEXT_PHASE,
} from "../globalactions";

const initialState = {
  phaseIndex: 0,
  acceptColour: 'Orange'
};

export default function(state = initialState, action) {
  switch (action.type) {
    case NEXT_PHASE:

      return {
        ...state,
        phaseIndex: state.phaseIndex + 1,
      }
    default:
      return state;
  }
}
