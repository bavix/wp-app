import React, {Component} from 'react';
import {KeyboardAvoidingView, StyleSheet} from 'react-native'
import {Button, Input} from 'react-native-elements'
import Colors from "../../../constants/Colors"
import TokenRegister from '../../../helpers/TokenRegister'
import {connect} from 'react-redux'
import {user} from '../../actions'
import AuthPure from "../../components/AuthPure";

class Forgot extends AuthPure {

  static mapStateToProps = ({user}) => user.toJS();

  static mapDispatchToProps = {
    forgot: user.forgot,
  };

  static navigationOptions = {
    title: 'Forgot'
  };

  state = {
    email: '',
    // loading: false,
  };

  forgot = async () => {
    const {email} = this.state;
    try {
      await this.props.forgot({
        deferred: true,
        email,
      });
      await TokenRegister.setToken(this.props.token);
      await this.props.navigation.navigate('App');
    } catch (e) {
      console.log(e.message)
      // todo
    }
  };

  render() {
    return <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>

      <Input containerStyle={styles.username}
             onChangeText={(email) => this.setState({email})}
             label='E-mail'/>

      <Button style={styles.login} title="Submit"
              disabled={this.props.loading}
              loading={this.props.loading}
              onPress={this.forgot}/>

    </KeyboardAvoidingView>
  }

}

export default connect(
  Forgot.mapStateToProps,
  Forgot.mapDispatchToProps
)(Forgot);

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
