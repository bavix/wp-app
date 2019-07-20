import userActions from '../actions/user'
import {fromJS} from 'immutable'
import get from 'lodash/get'
import {addIssuer} from "../helpers/tokenizer";

const {forgot, signUp, signIn, signOut, getUser, refresh} = userActions;

const INITIAL_STATE = fromJS({
  profile: {},
  token: {},
  message: '',
  loading: false,
});

export default (state = INITIAL_STATE, action) => {
  const {type, payload} = action;

  switch (type) {
    // forgot
    case forgot.TRIGGER:
      return state
        .set('loading', true)
        .set('message', '');

    case forgot.SUCCESS:
      return state;

    case forgot.FAILURE:
      return state.set('message', get(payload, 'hint', payload.message));

    case forgot.FULFILL:
      return state.set('loading', false);

    // singUp
    case signUp.TRIGGER:
      return state
        .set('loading', true)
        .set('message', '');

    case signUp.SUCCESS:
      return state
        .set('profile', fromJS(payload));

    case signUp.FAILURE:
      return state.set('message', get(payload, 'hint', payload.message));

    case signUp.FULFILL:
      return state.set('loading', false);

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
        .set('token', fromJS({}));

    case signOut.FAILURE:
      return state.set('message', get(payload, 'hint', payload.message));

    case signOut.FULFILL:
      return state.set('loading', false);

    default:
      return state;
  }
}
