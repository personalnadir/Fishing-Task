import {
  NEXT_PHASE,
  SET_AB_VARIANT
} from "../globalactions";

const acceptColours = {
  a: 'Orange',
  b: 'Blue'
};

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
      };
    case SET_AB_VARIANT:

      return {
        ...state,
        acceptColour: acceptColours[action.variant]
      };
    default:
      return state;
  }
}
