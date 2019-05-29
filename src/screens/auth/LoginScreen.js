import React from 'react';
import {KeyboardAvoidingView, StyleSheet} from 'react-native';
import {Button, Input} from 'react-native-elements/src/index';
import Colors from "../../../constants/Colors";
import {client} from '../../../helpers/OAuth';
import TokenRegister from '../../../helpers/TokenRegister';
import AuthPureComponent from "../../components/AuthPureComponent";

export default class LoginScreen extends AuthPureComponent {

  static navigationOptions = {
    title: 'Login'
  };

  state = {
    username: '',
    password: '',
    message: '',
    loading: false,
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
    this.setState({loading: true, message: ''});
    const {username, password} = this.state;
    await client.authAsync(username, password).then(({data}) => {
      TokenRegister.setToken(data);
      this.setState({loading: false});
      this.props.navigation.navigate('App');
    }).catch(({response}) => {
      this.setState({
        loading: false,
        message: response.data.hint ?
          response.data.hint :
          response.data.message,
      });
    })
  };

  render() {
    return <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <Input containerStyle={styles.username}
             onChangeText={(username) => this.setState({username})}
             label='Username'/>

      <Input containerStyle={styles.password}
             label='Password'
             secureTextEntry={true}
             errorMessage={this.state.message}
             errorStyle={styles.error}
             onChangeText={(password) => this.setState({password})}
             rightIcon={<Button
               titleStyle={styles.btn}
               title="Forgot?"
               onPress={this.forgot}
               type="clear"/>}/>

      <Button style={styles.login} title="Log In"
              disabled={this.state.loading}
              loading={this.state.loading}
              onPress={this.login}/>

      <Button titleStyle={styles.btn} title="Register" type="clear" onPress={this.register}/>

    </KeyboardAvoidingView>
  }

}

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
