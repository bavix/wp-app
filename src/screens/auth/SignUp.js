import React, {Component} from 'react';
import {KeyboardAvoidingView, StyleSheet} from 'react-native'
import {Button, Input} from 'react-native-elements'
import Colors from "../../../constants/Colors"
import TokenRegister from '../../../helpers/TokenRegister'
import {connect} from 'react-redux'
import {user} from '../../actions'
import AuthPure from "../../components/AuthPure";

class SignUp extends AuthPure {

  static mapStateToProps = ({user}) => user.toJS();

  static mapDispatchToProps = {
    signIn: user.signIn,
    signUp: user.signUp,
  };

  static navigationOptions = {
    title: 'Sign Up'
  };

  state = {
    username: '',
    email: '',
    password: '',
    // loading: false,
  };

  register = async () => {
    const {username, password, email} = this.state;
    try {
      await this.props.signUp({
        deferred: true,
        username,
        email,
        password,
      });

      await this.props.signIn({deferred: true, username, password,});
      await TokenRegister.setToken(this.props.token);
      await this.props.navigation.navigate('App');
    } catch (e) {
      console.log(e.message)
    }
  };

  render() {
    return <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <Input containerStyle={styles.username}
             onChangeText={(username) => this.setState({username})}
             label='Username'/>

      <Input containerStyle={styles.email}
             onChangeText={(email) => this.setState({email})}
             label='E-mail'/>

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

      <Button style={styles.login} title="Sign Up"
              disabled={this.props.loading}
              loading={this.props.loading}
              onPress={this.register}/>

    </KeyboardAvoidingView>
  }

}

export default connect(
  SignUp.mapStateToProps,
  SignUp.mapDispatchToProps
)(SignUp);

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
