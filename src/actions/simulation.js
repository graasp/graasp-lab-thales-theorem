import { TOGGLE_NODE } from '../types';

export const toggleNode = (node, nodeStatus) => (dispatch) => {
  console.log('nodenode', node, nodeStatus);
  dispatch({
    type: TOGGLE_NODE,
    payload: { node, nodeStatus },
  });
};

export default { toggleNode };
