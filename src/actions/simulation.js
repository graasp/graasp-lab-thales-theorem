import { TOGGLE_NODE, CLICK_POINT, FRACTION_CHECK } from '../types';

export const toggleNode = (node, nodeStatus) => (dispatch) => {
  dispatch({
    type: TOGGLE_NODE,
    payload: { node, nodeStatus },
  });
};

export const clickOnPoints = pointState => (dispatch) => {
  dispatch({ type: CLICK_POINT, payload: pointState });
};

export const checkFraction = isChecked => (dispatch) => {
  dispatch({ type: FRACTION_CHECK, payload: isChecked });
};

export default { toggleNode };
