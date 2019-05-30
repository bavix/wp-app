import {PureComponent as Component} from 'react'
import {connect} from 'react-redux'

/**
 * @deprecated
 */
class AuthPureComponent extends Component {

  static mapStateToProps = ({user}) => user.toJS();

  _authScreens = [
    'Login', 'Register', 'Forgot'
  ];

  _bootstrapAsync = (payload) => {
    if (this._authScreens.includes(payload.state.routeName)) {
      if (this.props.auth) {
        this.props.navigation.navigate('App');
      }
    } else if (!this.props.auth) {
      this.props.navigation.navigate('Auth');
    }
  };

  componentDidMount() {
    this.props.navigation.addListener(
      'didFocus',
      this._bootstrapAsync
    );
  }

}

export default connect(AuthPureComponent.mapStateToProps)(AuthPureComponent)
