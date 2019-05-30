import userActions from '../actions/user'
import {fromJS} from 'immutable'
import get from 'lodash/get'

const {signIn, signOut, getUser} = userActions;

const INITIAL_STATE = fromJS({
  token: {},
  message: '',
  loading: false,
  auth: false,
});

export default (state = INITIAL_STATE, action) => {
  const {type, payload} = action;

  switch (type) {
    // singIn
    case signIn.TRIGGER:
      return state
        .set('loading', true)
        .set('message', '')
        .set('auth', false);

    case signIn.SUCCESS:
      return state
        .set('token', fromJS(payload))
        .set('auth', true);

    case signIn.FAILURE:
      return state.set('message', get(payload, 'hint', payload.message));

    case signIn.FULFILL:
      return state.set('loading', false);

    // signOut
    case signOut.TRIGGER:
      return state
        .set('loading', true)
        .set('message', '');

    case signOut.SUCCESS:
      return state
        .set('token', fromJS({}))
        .set('auth', false);

    case signOut.FAILURE:
      return state.set('message', get(payload, 'hint', payload.message));

    case signOut.FULFILL:
      return state.set('loading', false);

    default:
      return state;
  }
}
