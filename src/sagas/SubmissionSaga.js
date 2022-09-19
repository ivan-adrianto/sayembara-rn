import {all, call, put, takeLatest} from 'redux-saga/effects';
import {
  Types as SubmissionTypes,
  Creators as SubmissionActions,
} from '../redux/SubmissionRedux';
import {getSubmission, postSubmission} from '../services/submission';

/* ---- Post Submission ---- */
function* postSubmissionSaga(action) {
  try {
    const res = yield call(postSubmission, action.data);
    yield put(SubmissionActions.postSubmissionSuccess(res.data.data));
  } catch (error) {
    yield put(
      SubmissionActions.postSubmissionFailure(error.response?.data?.message),
    );
  }
}

export function* postSubmissionRequestSaga() {
  yield takeLatest(SubmissionTypes.POST_SUBMISSION_REQUEST, postSubmissionSaga);
}

/* ---- Get Submission ---- */
function* getSubmissionSaga(action) {
  try {
    const res = yield call(getSubmission, action.data);
    console.log(JSON.stringify(res.data.data, null, 4));
    
    yield put(SubmissionActions.getSubmissionSuccess(res.data.data));
  } catch (error) {
    yield put(
      SubmissionActions.getSubmissionFailure(error.response?.data?.message),
    );
  }
}

export function* getSubmissionRequestSaga() {
  yield takeLatest(SubmissionTypes.GET_SUBMISSION_REQUEST, getSubmissionSaga);
}

export function* submissionSaga() {
  yield all([call(postSubmissionRequestSaga), call(getSubmissionRequestSaga)]);
}
