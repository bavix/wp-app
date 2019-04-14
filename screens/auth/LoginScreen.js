import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Colors from "../../constants/Colors";
import { client } from '../../helpers/AppAuth';
import TokenRegister  from '../../helpers/TokenRegister';

export default class LoginScreen extends React.PureComponent {

  static navigationOptions = {
    title: 'Login'
  };

  state = {
    username: '',
    password: '',
    message: '',
    loading: false,
  };

  forgot = () => alert('Forgot');
  register = () => alert('Register');

  login = async () => {
    this.setState({ loading: true, message: '' });
    const { username, password } = this.state;
    await client.authAsync(username, password).then(({ data }) => {
      TokenRegister.setToken(data);
      this.setState({ loading: false });
    }).catch(({ response }) => {
      console.log(response.data)
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
             onChangeText={(username) => this.setState({ username })}
             label='Username' />

      <Input containerStyle={styles.password}
             label='Password'
             secureTextEntry={true}
             errorMessage={this.state.message}
             errorStyle={styles.error}
             onChangeText={(password) => this.setState({ password })}
             rightIcon={<Button
               titleStyle={styles.btn}
               title="Forgot?"
               onPress={this.forgot}
               type="clear" />} />

      <Button style={styles.login} title="Log In"
              disabled={this.state.loading}
              loading={this.state.loading}
              onPress={this.login} />

      <Button titleStyle={styles.btn} title="Register" type="clear" onPress={this.register} />

    </KeyboardAvoidingView>
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  username: {
  },
  password: {
    paddingTop: 10,
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
