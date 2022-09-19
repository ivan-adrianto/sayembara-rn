import {createActions, createReducer} from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

export const {Types, Creators} = createActions({
  // Post Submission
  postSubmissionRequest: ['data'],
  postSubmissionSuccess: ['payload'],
  postSubmissionFailure: ['error'],

  // Get Submission Detail
  getSubmissionRequest: ['data'],
  getSubmissionSuccess: ['payload'],
  getSubmissionFailure: ['error'],

  //   reset state
  resetSubmissionState: ['data'],
});

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  isLoadingPostSubmission: false,
  dataPostSubmission: null,
  errorPostSubmission: null,
  isLoadingGetSubmission: false,
  dataGetSubmission: null,
  errorGetSubmission: null,
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

// Get Submission Detail
export const getSubmissionRequest = state =>
  state.merge({isLoadingGetSubmission: true, dataGetSubmission: null});

export const getSubmissionSuccess = (state, action) => {
  const {payload} = action;
  return state.merge({
    isLoadingGetSubmission: false,
    errorGetSubmission: null,
    dataGetSubmission: payload,
  });
};

export const getSubmissionFailure = (state, action) => {
  const {error} = action;
  return state.merge({
    isLoadingGetSubmission: false,
    errorGetSubmission: error,
    dataGetSubmission: null,
  });
};

// Reset State
export const resetSubmissionState = state =>
  state.merge({dataPostSubmission: null, errorPostSubmission: null});
/* ------------- Hookup Reducers To Type ------------- */

export const submissionReducer = createReducer(INITIAL_STATE, {
  // post submission
  [Types.POST_SUBMISSION_REQUEST]: postSubmissionRequest,
  [Types.POST_SUBMISSION_SUCCESS]: postSubmissionSuccess,
  [Types.POST_SUBMISSION_FAILURE]: postSubmissionFailure,

  // submission detail
  [Types.GET_SUBMISSION_REQUEST]: getSubmissionRequest,
  [Types.GET_SUBMISSION_SUCCESS]: getSubmissionSuccess,
  [Types.GET_SUBMISSION_FAILURE]: getSubmissionFailure,
  [Types.RESET_SUBMISSION_STATE]: resetSubmissionState,
});
