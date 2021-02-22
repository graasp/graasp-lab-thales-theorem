import { SET_FRACTION_SPOT, UNSET_FRACTION_SPOT, RESET_FRACTION_SPOT } from '../types/fractionSpotTypes';

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

const initialState = {
  fraction1_spot1: '',
  fraction1_spot2: '',
  fraction2_spot1: '',
  fraction2_spot2: '',
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FRACTION_SPOT:
      return {
        ...state,
        fraction1_spot1: state.fraction1_spot1 === action.valueSpot ? '' : state.fraction1_spot1,
        fraction1_spot2: state.fraction1_spot2 === action.valueSpot ? '' : state.fraction1_spot2,
        fraction2_spot1: state.fraction2_spot1 === action.valueSpot ? '' : state.fraction2_spot1,
        fraction2_spot2: state.fraction2_spot2 === action.valueSpot ? '' : state.fraction2_spot2,
        [action.fractionSpot]: action.valueSpot,
      };
    case UNSET_FRACTION_SPOT:
      return {
        ...state,
        [getKeyByValue(state, action.valueToUnset)]: '',
      };
    case RESET_FRACTION_SPOT:
      return { ...initialState };
    default:
      return state;
  }
};
