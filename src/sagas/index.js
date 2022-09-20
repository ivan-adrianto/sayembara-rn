import {all, call} from 'redux-saga/effects';
import {authSaga} from './AuthSaga';
import {contestSaga} from './ContestSaga';
import {profileSaga} from './ProfileSaga';
import {submissionSaga} from './SubmissionSaga';

export default function* rootSaga() {
  yield all([
    call(authSaga),
    call(contestSaga),
    call(submissionSaga),
    call(profileSaga),
  ]);
}
