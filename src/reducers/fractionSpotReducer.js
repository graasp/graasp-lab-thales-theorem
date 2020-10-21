import { SET_FRACTION_SPOT, RESET_FRACTION_SPOT } from '../types/fractionSpotTypes';

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
        [action.fractionSpot]: action.valueSpot,
      };
    case RESET_FRACTION_SPOT:
      return { ...initialState };
    default:
      return state;
  }
};
