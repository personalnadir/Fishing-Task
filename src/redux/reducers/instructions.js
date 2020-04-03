import {
  NEXT_PAGE,
} from "../instructionactions";

const initialState = {
  page: 0,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case NEXT_PAGE:
      return {
        ...state,
        page: state.page + 1,
      }
    default:
      return state;
  }
}
