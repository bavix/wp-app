import {call, put, takeLatest} from 'redux-saga/effects'
import userActions from '../actions/user'
import oauth from "../helpers/oauth";

export function* signIn(action) {
  const { success, failure, fulfill } = userActions.signIn;
  const { username, password } = action.payload;
  try {
    const response = yield call(oauth.client.authAsync, {username, password});
    put(success(response))
  } catch (e) {
    put(failure(error))
  } finally {
    yield put(fulfill());
  }
}

export function* signOut() {
  const { success, failure, fulfill } = userActions.signIn;
  try {

  } catch (e) {

  } finally {
    yield put(fulfill());
  }
}

export function* getUser() {
  const { success, failure, fulfill } = userActions.signIn;
  try {

  } catch (e) {

  } finally {
    yield put(fulfill());
  }
}

export default function* watcherSaga() {
  yield takeLatest(userActions.signIn.TRIGGER, signIn);
  yield takeLatest(userActions.signOut.TRIGGER, signOut);
  yield takeLatest(userActions.getUser.TRIGGER, getUser);
}
