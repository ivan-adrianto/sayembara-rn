import {createActions, createReducer} from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

export const {Types, Creators} = createActions({
  // Post Submission
  postSubmissionRequest: ['data'],
  postSubmissionSuccess: ['payload'],
  postSubmissionFailure: ['error'],

  //   reset state
  resetSubmissionState: ['data'],
});

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  isLoadingPostSubmission: false,
  dataPostSubmission: null,
  errorPostSubmission: null,
});

/* ------------- Reducers ------------- */

// Post Submission
export const postSubmissionRequest = state =>
  state.merge({isLoadingPostSubmission: true, dataPostSubmission: null});

export const postSubmissionSuccess = (state, action) => {
  const {payload} = action;
  return state.merge({
    isLoadingPostSubmission: false,
    errorPostSubmission: null,
    dataPostSubmission: payload,
  });
};

export const postSubmissionFailure = (state, action) => {
  const {error} = action;
  return state.merge({
    isLoadingPostSubmission: false,
    errorPostSubmission: error,
    dataPostSubmission: null,
  });
};

// Reset State
export const resetSubmissionState = state =>
  state.merge({dataPostSubmission: null, errorPostSubmission: null});
/* ------------- Hookup Reducers To Type ------------- */

export const submissionReducer = createReducer(INITIAL_STATE, {
  // register
  [Types.POST_SUBMISSION_REQUEST]: postSubmissionRequest,
  [Types.POST_SUBMISSION_SUCCESS]: postSubmissionSuccess,
  [Types.POST_SUBMISSION_FAILURE]: postSubmissionFailure,
  [Types.RESET_SUBMISSION_STATE]: resetSubmissionState,
});
