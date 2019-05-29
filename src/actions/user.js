import {createRoutine} from 'redux-saga-routines';

const signIn = createRoutine('USER_SIGN_IN');
const signOut = createRoutine('USER_SIGN_OUT');
const getUser = createRoutine('USER_GET_SELF');

export default {
  signIn,
  signOut,
  getUser,
}
