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
});

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  isLoadingCategories: false,
  dataCategories: [],
  errorCategories: null,
  isLoadingContests: false,
  dataContests: [],
  errorContests: null,
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
  
});
