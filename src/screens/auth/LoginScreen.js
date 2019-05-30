import React, {Component} from 'react';
import {KeyboardAvoidingView, StyleSheet} from 'react-native'
import {Button, Input} from 'react-native-elements'
import Colors from "../../../constants/Colors"
import TokenRegister from '../../../helpers/TokenRegister'
import AuthPureComponent from "../../components/AuthPureComponent"
import {connect} from 'react-redux'
import {user} from '../../actions'
import { bindActionCreators } from 'redux'

class LoginScreen extends Component {

  static mapStateToProps = ({user}) => user.toJS();

  static mapDispatchToProps = dispatch => bindActionCreators(
    {signIn: user.signIn},
    dispatch,
  );

  static navigationOptions = {
    title: 'Login'
  };

  state = {
    username: '',
    password: '',
    // loading: false,
  };

  forgot = () => {
    this.props.navigation.navigate('Forgot', {
      username: this.state.username,
    });
  };

  register = () => {
    this.props.navigation.navigate('Register', {
      username: this.state.username,
      password: this.state.password,
    });
  };

  login = async () => {
    const {username, password} = this.state;
    try {
      await this.props.signIn({
        deferred: true,
        username,
        password,
      });
      await TokenRegister.setToken(this.props.token);
      await this.props.navigation.navigate('App');
    } catch (e) {
      // todo
    }
  };

  render() {
    return <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <Input containerStyle={styles.username}
             onChangeText={(username) => this.setState({username})}
             label='Username'/>

      <Input containerStyle={styles.password}
             label='Password'
             secureTextEntry={true}
             errorMessage={this.props.message}
             errorStyle={styles.error}
             onChangeText={(password) => this.setState({password})}
             rightIcon={<Button
               titleStyle={styles.btn}
               title="Forgot?"
               onPress={this.forgot}
               type="clear"/>}/>

      <Button style={styles.login} title="Log In"
              disabled={this.props.loading}
              loading={this.props.loading}
              onPress={this.login}/>

      <Button titleStyle={styles.btn} title="Register" type="clear" onPress={this.register}/>

    </KeyboardAvoidingView>
  }

}

export default connect(
  LoginScreen.mapStateToProps,
  LoginScreen.mapDispatchToProps
)(LoginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  username: {},
  password: {
    paddingTop: 10,
    paddingBottom: 15,
  },
  login: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  btn: {
    color: Colors.tintColor
  },
  error: {
    fontSize: 16
  }
});
