import userActions from '../actions/user';

const {signIn, signOut, getUser} = userActions;

const INITIAL_STATE = {
  loading: false,
  token: false,
  auth: false,
};

export default (state = INITIAL_STATE, action) => {
  const {type, payload} = action;

  switch (type) {
    /**
     * signIn
     * */
    case signIn.TRIGGER: {
      return state.setIn(['loading', 'auth'], true);
    }

    case signIn.SUCCESS: {
      // const {token} = payload;
      console.log(payload);
      return state;
      // return state.set('token', token);
    }

    // case signIn.FULFILL: {
      // return state.setIn(['loading', 'auth'], false);
    // }

    /**
     * signOut
     * */
    // case signOut.SUCCESS: {
    //   return state.set('token', '').set('data', fromJS({}));
    // }

    default:
      return state;
  }
}
