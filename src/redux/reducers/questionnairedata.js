import {
  SET_KEY_SELECTED,
  CLEAR_KEYS_SELECTED,
} from "../questionnairedataactions";

const initialState = {
  keysSelected: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_KEY_SELECTED:
      const keysSelected = state.keysSelected;
      let data = {...action};
      delete data.type;
      keysSelected.push(data);
      return {
        ...state,
        keysSelected
      };
    case CLEAR_KEYS_SELECTED:
      return {
        ...state,
        keysSelected: []
      };
    default:
      return state;
  }
}
