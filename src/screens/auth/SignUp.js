import React, {Component} from 'react';
import {View} from 'react-native';
import AuthPure from "../../components/AuthPure";
import {connect} from 'react-redux';

class SignUp extends AuthPure {

  static mapStateToProps = ({user}) => user.toJS();

  static navigationOptions = {
    title: 'Register'
  };

  render() {
    return <View/>
  }

}

export default connect(
  SignUp.mapStateToProps,
)(SignUp);
