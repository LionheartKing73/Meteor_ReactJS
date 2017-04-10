import { combineReducers } from 'redux';
import nimble from './nimble';
import user from './user';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  nimble,
  user,
  routing: routerReducer
});
