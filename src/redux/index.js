import {combineReducers} from 'redux';
import {authReducer} from './AuthRedux';

export const rootReducer = combineReducers({
  auth: authReducer,
});
