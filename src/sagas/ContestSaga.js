import {all, call, put, takeLatest} from 'redux-saga/effects';
import {
  Types as ContestTypes,
  Creators as ContestActions,
} from '../redux/ContestRedux';
import {
  getCategories,
  getContestDetail,
  getContests,
} from '../services/contest';

/* ---- Get Categories ---- */
function* categoriesSaga() {
  try {
    const res = yield call(getCategories);
    yield put(ContestActions.getCategoriesSuccess(res.data.data));
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      yield put(
        ContestActions.getCategoriesFailure('You have no internet connection'),
      );
    } else if (error.response?.data) {
      yield put(
        ContestActions.getCategoriesFailure(error.response?.data?.message),
      );
    } else {
      yield put(
        ContestActions.getCategoriesFailure(
          'Something went wrong. Try again later',
        ),
      );
    }
  }
}

export function* categoriesRequestSaga() {
  yield takeLatest(ContestTypes.GET_CATEGORIES_REQUEST, categoriesSaga);
}

/* ---- Get Contests ---- */
function* contestsSaga(action) {
  try {
    const res = yield call(getContests, action.data);
    const data = res.data?.data?.map(item => {
      if (item.join_status === 'joined') {
        item.footer_text = 'Open';
        item.footer_background_color = '#D4E7FF';
        item.footer_text_color = '#54A0FF';
      } else if (item.join_status === 'winner') {
        item.footer_text = 'Win';
        item.footer_background_color = '#C7F3E7';
        item.footer_text_color = '#1DD1A1';
      } else {
        item.footer_text = 'Apply';
        item.footer_background_color = '#1DD1A1';
        item.footer_text_color = 'white';
      }
      return item;
    });
    yield put(ContestActions.getContestsSuccess(data));
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      yield put(
        ContestActions.getContestsFailure('You have no internet connection'),
      );
    } else if (error.response?.data) {
      yield put(
        ContestActions.getContestsFailure(error.response?.data?.message),
      );
    } else {
      yield put(
        ContestActions.getContestsFailure(
          'Something went wrong. Try again later',
        ),
      );
    }
  }
}

export function* contestsRequestSaga() {
  yield takeLatest(ContestTypes.GET_CONTESTS_REQUEST, contestsSaga);
}

/* ---- Get CaontestDetail ---- */
function* contestDetailSaga(action) {
  try {
    const res = yield call(getContestDetail, action.data);
    yield put(ContestActions.getContestDetailSuccess(res.data.data));
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      yield put(
        ContestActions.getContestDetailFailure(
          'You have no internet connection',
        ),
      );
    } else if (error.response?.data) {
      yield put(
        ContestActions.getContestDetailFailure(error.response?.data?.message),
      );
    } else {
      yield put(
        ContestActions.getContestDetailFailure(
          'Something went wrong. Try again later',
        ),
      );
    }
  }
}

export function* contestDetailRequestSaga() {
  yield takeLatest(ContestTypes.GET_CONTEST_DETAIL_REQUEST, contestDetailSaga);
}

export function* contestSaga() {
  yield all([
    call(categoriesRequestSaga),
    call(contestsRequestSaga),
    call(contestDetailRequestSaga),
  ]);
}
