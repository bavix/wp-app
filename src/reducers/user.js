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
      const hint = get(payload, 'hint', payload.message);
      return state.set('message', hint);

    case signIn.FULFILL:
      return state.set('loading', false);

    default:
      return state;
  }
}
