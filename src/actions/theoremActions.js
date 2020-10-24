import { THEOREM_CAN_APPLY, THEOREM_CANNOT_APPLY, RESET } from '../types/theoremTypes';

export const applyTheorem = theoremApplicationCircle => (dispatch) => {
  dispatch({
    type: THEOREM_CAN_APPLY,
    theoremApplicationCircle,
  });
};

export const dontApplyTheorem = () => (dispatch) => {
  dispatch({
    type: THEOREM_CANNOT_APPLY,
  });
};

export const reset = () => (dispatch) => {
  dispatch({
    type: RESET,
  });
};
