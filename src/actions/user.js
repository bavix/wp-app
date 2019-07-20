import {createRoutine} from 'redux-saga-routines';

const forgot = createRoutine('USER_FORGOT');
const signIn = createRoutine('USER_SIGN_IN');
const signUp = createRoutine('USER_SIGN_UP');
const signOut = createRoutine('USER_SIGN_OUT');
const getUser = createRoutine('USER_GET_SELF');
const refresh = createRoutine('USER_REFRESH');

export default {
  forgot,
  signIn,
  signUp,
  signOut,
  refresh,
  getUser,
}
