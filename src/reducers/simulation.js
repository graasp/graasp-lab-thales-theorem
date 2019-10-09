import { TOGGLE_NODE } from '../types';

const INITIAL_STATE = {
  node: {
    A: 'A',
    B: 'B',
    C: 'C',
    D: 'D',
    E: 'E',
  },
  nodeStatus: null,
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case TOGGLE_NODE:
      return {
        ...state,
        node: payload.node,
        nodeStatus: payload.nodeStatus,
      };
    default:
      return state;
  }
};
