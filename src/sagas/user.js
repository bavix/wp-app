import {call, put, takeLatest} from 'redux-saga/effects'
import userActions from '../actions/user'
import oauth, {client} from "../api/oauth";
import {refreshToken} from "../helpers/tokenizer";

export function* signIn(action) {
  const { request, success, failure, fulfill } = userActions.signIn;
  const { username, password, deferred } = action.payload;
  try {
    yield put(request());
    const response = yield call(oauth.client.authAsync, username, password);
    yield put(success(response.data));
    if (deferred) {
      deferred.resolve();
    }
  } catch ({response}) {
    yield put(failure(response.data));
    if (deferred) {
      deferred.reject(response.data);
    }
  } finally {
    yield put(fulfill());
  }
}

export function* signOut(action) {
  const { request, success, failure, fulfill } = userActions.signOut;
  const { token, deferred } = action.payload;
  try {
    yield put(request());
    yield call(client.revokeAsync, token);
    yield put(success());
    if (deferred) {
      deferred.resolve();
    }
  } catch (e) {
    yield put(failure(e));
    if (deferred) {
      deferred.reject(e);
    }
  } finally {
    yield put(fulfill());
  }
}

export function* getUser() {
  const { success, failure, fulfill } = userActions.getUser;
  try {

  } catch (e) {

  } finally {
    yield put(fulfill());
  }
}

export function* refresh() {
  const { request, success, failure, fulfill } = userActions.refresh;
  const { token, deferred } = action.payload;
  try {
    yield put(request());
    const data = refreshToken(token);
    const response = yield call(oauth.client.refreshAsync, data);
    yield put(success(response.data));
    if (deferred) {
      deferred.resolve();
    }
  } catch ({response}) {
    yield put(failure(response.data));
    if (deferred) {
      deferred.reject(response.data);
    }
  } finally {
    yield put(fulfill());
  }
}

export default function* watcherSaga() {
  yield takeLatest(userActions.signIn.TRIGGER, signIn);
  yield takeLatest(userActions.signOut.TRIGGER, signOut);
  yield takeLatest(userActions.getUser.TRIGGER, getUser);
  yield takeLatest(userActions.refresh.TRIGGER, refresh);
}
