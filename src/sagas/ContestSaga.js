import {all, call, put, takeLatest} from 'redux-saga/effects';
import {
  Types as ContestTypes,
  Creators as ContestActions,
} from '../redux/ContestRedux';
import {getCategories, getContests} from '../services/contest';

/* ---- Get Categories ---- */
function* categoriesSaga() {
  try {
    const res = yield call(getCategories);
    yield put(ContestActions.getCategoriesSuccess(res.data.data));
  } catch (error) {
    yield put(ContestActions.getCategoriesFailure(error.response.data));
  }
}

export function* categoriesRequestSaga() {
  yield takeLatest(ContestTypes.GET_CATEGORIES_REQUEST, categoriesSaga);
}

/* ---- Get Contests ---- */
function* contestsSaga(action) {
  const data = action.data;
  try {
    const res = yield call(getContests, data);
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
      return item
    });
    console.log('data', console.log(JSON.stringify(data, null, 4)))
    yield put(ContestActions.getContestsSuccess(data));
  } catch (error) {
    yield put(ContestActions.getContestsFailure(error.response?.data?.message));
  }
}

export function* contestsRequestSaga() {
  yield takeLatest(ContestTypes.GET_CONTESTS_REQUEST, contestsSaga);
}

export function* contestSaga() {
  yield all([call(categoriesRequestSaga), call(contestsRequestSaga)]);
}