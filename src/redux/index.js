import {combineReducers} from 'redux';
import {authReducer} from './AuthRedux';
import { contestReducer } from './ContestRedux';

export const rootReducer = combineReducers({
  auth: authReducer,
  contest: contestReducer
});