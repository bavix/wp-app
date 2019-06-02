import {Component} from 'react'
import {isUser} from "../helpers/tokenizer";

const authScreens = [
  'Login', 'Register', 'Forgot'
];

class AuthPure extends Component {

  componentDidMount() {
    this.props.navigation.addListener('didFocus', () => {
      const auth = isUser(this.props.token);
      const {routeName} = this.props.navigation.state;

      if (authScreens.includes(routeName)) {
        if (auth) {
          this.props.navigation.navigate('App');
        }
      } else if (!auth) {
        this.props.navigation.navigate('Auth');
      }
    });
  }

}

export default AuthPure;
