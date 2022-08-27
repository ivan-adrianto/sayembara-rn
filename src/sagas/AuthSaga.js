import {all, call, put, takeLatest} from 'redux-saga/effects';
import {addBearerToken} from '../services/apiServices';
import {register} from '../services/auth';
import * as Keychain from 'react-native-keychain';
import {Types as AuthTypes, Creators as AuthActions} from '../redux/AuthRedux';

function* registerSaga(action) {
  const data = action.data;
  try {
    const res = yield call(register, data);
    yield call(addBearerToken, res.data.data.token);
    Keychain.setInternetCredentials('token', 'token', res.data.data.token);
    yield put(AuthActions.registerSuccess(res.data));
    //   yield put(ProfileActions.getProfileRequest());
  } catch (error) {
    yield put(AuthActions.registerFailure(error.response.data?.message));
  }
}

export function* registerRequestSaga() {
  yield takeLatest(AuthTypes.REGISTER_REQUEST, registerSaga);
}


export function* authSaga() {
  yield all([
    call(registerRequestSaga),
  ]);
}
