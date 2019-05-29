import { all, spawn } from 'redux-saga/effects';
import watcherUser from './user';

export default function* rootSaga() {
  yield all([
    yield spawn(watcherUser),
  ]);
}
