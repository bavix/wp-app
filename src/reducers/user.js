import userActions from '../actions/user'
import {fromJS} from 'immutable'
import get from 'lodash/get'
import {addIssuer} from "../helpers/tokenizer";

const {signIn, signOut, getUser, refresh} = userActions;

const INITIAL_STATE = fromJS({
  token: {},
  message: '',
  loading: false,
});

export default (state = INITIAL_STATE, action) => {
  const {type, payload} = action;

  switch (type) {
    // singIn
    case signIn.TRIGGER:
      return state
        .set('loading', true)
        .set('message', '');

    case signIn.SUCCESS:
      return state
        .set('token', fromJS(addIssuer(payload)));

    case signIn.FAILURE:
      return state.set('message', get(payload, 'hint', payload.message));

    case signIn.FULFILL:
      return state.set('loading', false);

    // refresh
    case refresh.TRIGGER:
      return state
        .set('loading', true)
        .set('message', '');

    case refresh.SUCCESS:
      return state
        .set('token', fromJS(addIssuer(payload)));

    case refresh.FAILURE:
      return state.set('message', get(payload, 'hint', payload.message));

    case refresh.FULFILL:
      return state.set('loading', false);

    // signOut
    case signOut.TRIGGER:
      return state
        .set('loading', true)
        .set('message', '');

    case signOut.SUCCESS:
      return state
        .set('token', {});

    case signOut.FAILURE:
      return state.set('message', get(payload, 'hint', payload.message));

    case signOut.FULFILL:
      return state.set('loading', false);

    default:
      return state;
  }
}
