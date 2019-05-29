import {PureComponent} from 'react';
import AuthStatus from '../../helpers/AuthStatus';

/**
 * @deprecated
 */
export default class AuthPureComponent extends PureComponent {

  _authScreens = [
    'Login', 'Register', 'Forgot'
  ];

  _bootstrapAsync = (payload) => {
    AuthStatus.isUser().then(isUser => {
      if (this._authScreens.includes(payload.state.routeName)) {
        if (isUser) {
          this.props.navigation.navigate('App');
        }
      } else if (!isUser) {
        this.props.navigation.navigate('Auth');
      }
    });
  };

  componentDidMount() {
    this.props.navigation.addListener(
      'didFocus',
      this._bootstrapAsync
    );
  }

}
