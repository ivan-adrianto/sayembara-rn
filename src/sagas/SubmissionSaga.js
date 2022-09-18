import {all, call, put, takeLatest} from 'redux-saga/effects';
import {
  Types as SubmissionTypes,
  Creators as SubmissionActions,
} from '../redux/SubmissionRedux';
import {postSubmission} from '../services/submission';

/* ---- Post Submission ---- */
function* postSubmissionSaga(action) {
  try {
    const res = yield call(postSubmission, action.data);
    yield put(SubmissionActions.postSubmissionSuccess(res.data.data));
  } catch (error) {
    console.log(JSON.stringify(error.response, null, 4));
    
    if (error.code === 'ERR_NETWORK') {
      yield put(
        SubmissionActions.postSubmissionFailure(
          'You have no internet connection',
        ),
      );
    } else if (error.response?.data) {
      yield put(
        SubmissionActions.postSubmissionFailure(error.response?.data?.message),
      );
    } else {
      yield put(
        SubmissionActions.postSubmissionFailure(
          'Something went wrong. Try again later',
        ),
      );
    }
  }
}

export function* postSubmissionRequestSaga() {
  yield takeLatest(SubmissionTypes.POST_SUBMISSION_REQUEST, postSubmissionSaga);
}

export function* submissionSaga() {
  yield all([call(postSubmissionRequestSaga)]);
}
