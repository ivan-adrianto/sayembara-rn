import {combineReducers} from 'redux';
import {authReducer} from './AuthRedux';
import {contestReducer} from './ContestRedux';
import {profileReducer} from './ProfileRedux';
import {submissionReducer} from './SubmissionRedux';

export const rootReducer = combineReducers({
  auth: authReducer,
  contest: contestReducer,
  submission: submissionReducer,
  profile: profileReducer,
});
