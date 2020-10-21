import { THEOREM_CAN_APPLY, THEOREM_CANNOT_APPLY, RESET } from '../types/theoremTypes';

export default (state = { status: false, circleChoosed: null }, action) => {
  switch (action.type) {
    case THEOREM_CAN_APPLY:
      return { status: true, circleChoosed: action.theoremApplicationCircle };
    case THEOREM_CANNOT_APPLY:
      return { status: false };
    case RESET:
      return { status: false, circleChoosed: null };
    default:
      return state;
  }
};
