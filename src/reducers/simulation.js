import { TOGGLE_NODE, CLICK_POINT, FRACTION_CHECK } from '../types';

const INITIAL_STATE = {
  node: {
    A: 'A',
    B: 'B',
    C: 'C',
    D: 'D',
    E: 'E',
  },
  nodeStatus: null,
  clickPoints: {
    firstClickedPointRef: null,
    firstClickedPoint: null,
    secondClickedPoint: null,
    secondClickedPointRef: null,
    mouseMoving: null,
  },
  fractionCheck: null,
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case TOGGLE_NODE:
      return {
        ...state,
        node: payload.node,
        nodeStatus: payload.nodeStatus,
      };
    case CLICK_POINT:
      return {
        ...state,
        clickPoints: {
          ...state.clickPoints,
          ...payload,
        },
      };
    case FRACTION_CHECK:
      return {
        ...state,
        fractionCheck: payload,
      };
    default:
      return state;
  }
};
