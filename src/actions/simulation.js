import { TOGGLE_NODE } from '../types';

export const toggleNode = (node, nodeStatus) => (dispatch) => {
  dispatch({
    type: TOGGLE_NODE,
    payload: { node, nodeStatus },
  });
};

export default { toggleNode };
