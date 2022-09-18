import {createActions, createReducer} from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

export const {Types, Creators} = createActions({
  // get Categories
  getCategoriesRequest: ['data'],
  getCategoriesSuccess: ['payload'],
  getCategoriesFailure: ['error'],

  // get Contests
  getContestsRequest: ['data'],
  getContestsSuccess: ['payload'],
  getContestsFailure: ['error'],

  // get Contest Detail
  getContestDetailRequest: ['data'],
  getContestDetailSuccess: ['payload'],
  getContestDetailFailure: ['error'],

  // reset contest state
  resetContestState: ['data'],
});

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  isLoadingCategories: false,
  dataCategories: [],
  errorCategories: null,
  isLoadingContests: false,
  dataContests: [],
  errorContests: null,
  isLoadingContestDetail: false,
  dataContestDetail: [],
  errorContestDetail: null,
});

/* ------------- Reducers ------------- */

// Get Categories
export const getCategoriesRequest = state =>
  state.merge({isLoadingCategories: true, dataCategories: []});

export const getCategoriesSuccess = (state, action) => {
  const {payload} = action;
  return state.merge({
    isLoadingCategories: false,
    errorCategories: null,
    dataCategories: payload,
    isLoggedIn: true,
  });
};

export const getCategoriesFailure = (state, action) => {
  const {error} = action;
  return state.merge({
    isLoadingCategories: false,
    errorCategories: error,
    dataCategories: [],
  });
};

// Get Contests
export const getContestsRequest = state =>
  state.merge({isLoadingContests: true, dataContests: []});

export const getContestsSuccess = (state, action) => {
  const {payload} = action;
  return state.merge({
    isLoadingContests: false,
    errorContests: null,
    dataContests: payload,
    isLoggedIn: true,
  });
};

export const getContestsFailure = (state, action) => {
  const {error} = action;
  return state.merge({
    isLoadingContests: false,
    errorContests: error,
    dataContests: [],
  });
};

// Get Contests Detail
export const getContestDetailRequest = state =>
  state.merge({isLoadingContestDetail: true, dataContestDetail: []});

export const getContestDetailSuccess = (state, action) => {
  const {payload} = action;
  return state.merge({
    isLoadingContestDetail: false,
    errorContestDetail: null,
    dataContestDetail: payload,
    isLoggedIn: true,
  });
};

export const getContestDetailFailure = (state, action) => {
  const {error} = action;
  return state.merge({
    isLoadingContestDetail: false,
    errorContestDetail: error,
    dataContestDetail: [],
  });
};

export const resetContestState = (state, action) => {
  return state.merge({
    errorContests: null,
    errorCategories: null
  })
}

/* ------------- Hookup Reducers To Type ------------- */

export const contestReducer = createReducer(INITIAL_STATE, {
  // get categories
  [Types.GET_CATEGORIES_REQUEST]: getCategoriesRequest,
  [Types.GET_CATEGORIES_SUCCESS]: getCategoriesSuccess,
  [Types.GET_CATEGORIES_FAILURE]: getCategoriesFailure,

  // get contests
  [Types.GET_CONTESTS_REQUEST]: getContestsRequest,
  [Types.GET_CONTESTS_SUCCESS]: getContestsSuccess,
  [Types.GET_CONTESTS_FAILURE]: getContestsFailure,

  // get contest detail
  [Types.GET_CONTEST_DETAIL_REQUEST]: getContestDetailRequest,
  [Types.GET_CONTEST_DETAIL_SUCCESS]: getContestDetailSuccess,
  [Types.GET_CONTEST_DETAIL_FAILURE]: getContestDetailFailure,
});
