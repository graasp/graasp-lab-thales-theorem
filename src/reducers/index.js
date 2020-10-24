import { combineReducers } from 'redux';
import layoutReducer from './layout';
import appInstanceReducer from './appInstance';
import contextReducer from './context';
import userReducer from './users';
import simulationReducer from './simulation';
import theoremReducer from './theoremReducer';
import fractionReducer from './fractionSpotReducer';

export default combineReducers({
  layout: layoutReducer,
  appInstance: appInstanceReducer,
  context: contextReducer,
  user: userReducer,
  simulation: simulationReducer,
  theoremCanApply: theoremReducer,
  fraction: fractionReducer,
});
